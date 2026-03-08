#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const LOG_FILE = path.join(process.env.HOME, ".shelby-vibe-log.json");

function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return [];
  return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
}

function saveLog(entries) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(entries, null, 2));
}

function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function upload(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error("Dosya bulunamadi: " + filePath);
    process.exit(1);
  }
  const fileName = path.basename(filePath);
  const fileSize = fs.statSync(filePath).size;
  const hash = hashFile(filePath);
  const timestamp = new Date().toISOString();
  const blobName = "vibe-outputs/" + Date.now() + "-" + fileName;

  console.log("\n=== SHELBY VIBE STORAGE - UPLOAD ===");
  console.log("Dosya    : " + fileName);
  console.log("Boyut    : " + (fileSize / 1024).toFixed(2) + " KB");
  console.log("SHA-256  : " + hash.substring(0, 16) + "...");
  console.log("Tarih    : " + timestamp);
  console.log("");

  try {
    execSync(
      "shelby upload " + filePath + " " + blobName + " -e 2026-12-31",
      { stdio: "inherit" }
    );
    const log = loadLog();
    log.push({ fileName, blobName, hash, timestamp, fileSize, verified: true });
    saveLog(log);
    console.log("\nShelbye yuklendi!");
    console.log("Hash kaydedildi: " + hash.substring(0, 16) + "...");
  } catch (err) {
    console.error("Upload hatasi:", err.message);
  }
}

function list() {
  const log = loadLog();
  if (log.length === 0) {
    console.log("Hic dosya yuklenmedi.");
    return;
  }
  console.log("\n=== SHELBY VIBE STORAGE - GECMIS ===");
  log.forEach((entry, i) => {
    console.log("\n[" + (i+1) + "] " + entry.fileName);
    console.log("    Tarih  : " + entry.timestamp);
    console.log("    Hash   : " + entry.hash.substring(0, 16) + "...");
    console.log("    Boyut  : " + (entry.fileSize / 1024).toFixed(2) + " KB");
  });
}

function verify(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error("Dosya bulunamadi: " + filePath);
    process.exit(1);
  }
  const fileName = path.basename(filePath);
  const currentHash = hashFile(filePath);
  const log = loadLog();
  const entry = log.find((e) => e.fileName === fileName);
  console.log("\n=== SHELBY VIBE STORAGE - VERIFY ===");
  if (!entry) {
    console.log("Bu dosya daha once yuklenmemis: " + fileName);
    return;
  }
  if (currentHash === entry.hash) {
    console.log("DOGRULANDI: " + fileName);
    console.log("Ilk yukleme : " + entry.timestamp);
    console.log("Hash eslesti: " + currentHash.substring(0, 16) + "...");
  } else {
    console.log("DEGISTIRILMIS: " + fileName);
    console.log("Orijinal : " + entry.hash.substring(0, 16) + "...");
    console.log("Mevcut   : " + currentHash.substring(0, 16) + "...");
  }
}

const [, , command, arg] = process.argv;
switch (command) {
  case "upload":
    if (!arg) { console.log("Kullanim: node src/index.js upload <dosya>"); process.exit(1); }
    upload(arg);
    break;
  case "list":
    list();
    break;
  case "verify":
    if (!arg) { console.log("Kullanim: node src/index.js verify <dosya>"); process.exit(1); }
    verify(arg);
    break;
  default:
    console.log("\n=== SHELBY VIBE STORAGE CLI ===");
    console.log("  upload <dosya>  -> Shelbiye yukle + hashle");
    console.log("  list            -> Tum yuklemeleri listele");
    console.log("  verify <dosya>  -> Dosya degisti mi kontrol et\n");
}
