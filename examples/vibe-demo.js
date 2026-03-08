const fs = require("fs");
const { execSync } = require("child_process");

const aiOutput = {
  prompt: "Build me a REST API with authentication",
  model: "claude-3-5-sonnet",
  timestamp: new Date().toISOString(),
  version: "1.0.0",
  generated_code: "const express = require('express'); const app = express(); app.listen(3000);"
};

fs.writeFileSync("ai-generated-api.json", JSON.stringify(aiOutput, null, 2));
console.log("AI output olusturuldu: ai-generated-api.json");

execSync("node src/index.js upload ai-generated-api.json", { stdio: "inherit" });
execSync("node src/index.js verify ai-generated-api.json", { stdio: "inherit" });
