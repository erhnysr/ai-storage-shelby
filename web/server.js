const express = require("express");
const multer = require("multer");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Dosya bulunamadi" });

  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const fileSize = req.file.size;
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  const blobName = "vibe-web/" + Date.now() + "-" + fileName;
  const timestamp = new Date().toISOString();

  try {
    const result = execSync(
      "shelby upload " + filePath + " " + blobName + " -e 2026-12-31",
      { encoding: "utf8", stdio: "pipe", input: "y\n" }
    );

    fs.unlinkSync(filePath);

    res.json({
      success: true,
      fileName,
      blobName,
      hash,
      timestamp,
      fileSize,
      message: "Shelby testnet'e yuklendi!"
    });
  } catch (err) {
    fs.unlinkSync(filePath);
    res.status(500).json({ error: "Upload hatasi: " + err.message });
  }
});

app.get("/list", (req, res) => {
  const logFile = path.join(process.env.HOME, ".shelby-vibe-log.json");
  if (!fs.existsSync(logFile)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(logFile, "utf8")));
});

app.listen(3000, () => {
  console.log("Shelby Vibe Storage web arayuzu: http://localhost:3000");
});
