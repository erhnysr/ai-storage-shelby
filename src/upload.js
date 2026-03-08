const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

async function uploadToShelby(filePath, blobName, expiration = "2026-12-31") {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Dosya bulunamadı: ${filePath}`);
    process.exit(1);
  }

  const fileSize = fs.statSync(filePath).size;
  const fileName = path.basename(filePath);

  console.log("🚀 Shelby Upload Başlatılıyor...");
  console.log(`📦 Dosya: ${fileName} (${(fileSize / 1024).toFixed(2)} KB)`);
  console.log(`📁 Hedef: ${blobName}`);
  console.log(`⏰ Bitiş: ${expiration}`);
  console.log("─────────────────────────────────");

  try {
    const result = execSync(
      `shelby upload "${filePath}" "${blobName}" -e ${expiration}`,
      { encoding: "utf8", stdio: "pipe" }
    );
    console.log("✅ Upload başarılı!");
    console.log(result);
  } catch (err) {
    console.error("❌ Upload hatası:", err.message);
  }
}

// CLI kullanımı: node src/upload.js <dosya> <blob-adı>
const [, , filePath, blobName] = process.argv;
if (filePath && blobName) {
  uploadToShelby(filePath, blobName);
} else {
  console.log("Kullanım: node src/upload.js <dosya-yolu> <blob-adı>");
  console.log("Örnek:    node src/upload.js ./model.bin ai-models/model-v1.bin");
}
