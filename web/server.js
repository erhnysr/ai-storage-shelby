const express = require("express");
const multer = require("multer");
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const upload = multer({ dest: "uploads/" });
const DB_FILE = path.join(__dirname, "drops.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

function loadDB() {
  if (!fs.existsSync(DB_FILE)) return {};
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function generateId() {
  return Math.random().toString(36).substring(2, 8);
}

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Dosya bulunamadi" });

  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const fileSize = req.file.size;
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const dropId = generateId();
  const blobName = "vibe-web/" + Date.now() + "-" + safeName;
  const expiry = req.body.expiry || "2026-12-31";
  const hash = hashFile(filePath);
  const timestamp = new Date().toISOString();

  const result = spawnSync(
    "shelby",
    ["upload", filePath, blobName, "-e", expiry, "--assume-yes"],
    { encoding: "utf8" }
  );

  const output = (result.stdout || "") + (result.stderr || "");
  const aptosMatch = output.match(/https:\/\/explorer\.aptoslabs\.com\/txn\/[^\s]+/);
  const shelbyMatch = output.match(/https:\/\/explorer\.shelby\.xyz\/[^\s]+/);

  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  if (!output.includes("Upload complete")) {
    return res.status(500).json({ error: "Upload basarisiz" });
  }

  const db = loadDB();
  db[dropId] = {
    dropId,
    fileName,
    fileSize,
    blobName,
    hash,
    timestamp,
    expiry,
    aptosLink: aptosMatch ? aptosMatch[0] : null,
    shelbyLink: shelbyMatch ? shelbyMatch[0] : null,
    downloads: 0
  };
  saveDB(db);

  // Log dosyasina da kaydet
  const logFile = path.join(process.env.HOME, ".shelby-vibe-log.json");
  let log = [];
  if (fs.existsSync(logFile)) log = JSON.parse(fs.readFileSync(logFile, "utf8"));
  log.push({ fileName, blobName, hash, timestamp, fileSize, verified: true });
  fs.writeFileSync(logFile, JSON.stringify(log, null, 2));

  res.json({
    success: true,
    dropId,
    fileName,
    hash,
    timestamp,
    fileSize,
    aptosExplorerLink: aptosMatch ? aptosMatch[0] : null,
    shelbyExplorerLink: shelbyMatch ? shelbyMatch[0] : null
  });
});

app.get("/drop/:id", (req, res) => {
  const db = loadDB();
  const drop = db[req.params.id];
  if (!drop) return res.status(404).json({ error: "Drop bulunamadi" });
  res.json(drop);
});

app.post("/drop/:id/download", async (req, res) => {
  const db = loadDB();
  const drop = db[req.params.id];
  if (!drop) return res.status(404).json({ error: "Drop bulunamadi" });

  const safeName = drop.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const outputPath = "/tmp/" + drop.dropId + "-" + safeName;

  const result = spawnSync(
    "shelby",
    ["download", drop.blobName, outputPath],
    { encoding: "utf8" }
  );

  if (!fs.existsSync(outputPath)) {
    return res.status(500).json({ error: "Indirme basarisiz" });
  }

  db[drop.dropId].downloads += 1;
  saveDB(db);

  res.download(outputPath, drop.fileName, () => {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });
});

app.get("/drops", (req, res) => {
  const db = loadDB();
  const list = Object.values(db).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json(list);
});

app.get("/list", (req, res) => {
  const logFile = path.join(process.env.HOME, ".shelby-vibe-log.json");
  if (!fs.existsSync(logFile)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(logFile, "utf8")));
});

app.get("/d/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "download.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Shelby Vibe Storage: http://localhost:3000");
});
