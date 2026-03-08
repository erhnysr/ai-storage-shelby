/**
 * Shelby Protocol - Temel Upload Örneği
 * Bu örnek, bir dosyayı Shelby ağına nasıl yükleyeceğinizi gösterir.
 *
 * Kullanım: node examples/basic-upload.js
 */

const { execSync } = require("child_process");
const fs = require("fs");

// Test dosyası oluştur
const testContent = {
  model: "test-model-v1",
  timestamp: new Date().toISOString(),
  description: "AI model metadata stored on Shelby Protocol",
  version: "1.0.0",
  network: "shelbynet"
};

fs.writeFileSync("test-model.json", JSON.stringify(testContent, null, 2));
console.log("📝 Test dosyası oluşturuldu: test-model.json");

// Shelby'e yükle
try {
  console.log("🚀 Shelby'e yükleniyor...");
  execSync(
    `shelby upload test-model.json ai-models/test-model.json -e 2026-12-31`,
    { stdio: "inherit" }
  );
  console.log("✅ Tamamlandı!");
} catch (err) {
  console.error("❌ Hata:", err.message);
}
