# AI Storage on Shelby Protocol

Decentralized AI model versioning and storage using [Shelby Protocol](https://shelby.xyz) — built on Aptos blockchain.

## Why Shelby?

Traditional AI model storage relies on centralized providers (AWS S3, GCS). Shelby offers:

- ✅ Decentralized hot storage
- ✅ Verifiable file integrity via blockchain
- ✅ Real-time streaming & serving
- ✅ Cost-effective at scale
- ✅ Built on Aptos — fast & low-fee

## Quick Start

### Install CLI
```bash
npm install -g @shelby-protocol/cli
shelby init
```

### Upload a Model
```bash
shelby upload ./your-model.bin ai-models/your-model-v1.bin -e 2026-12-31
```

### Run Example
```bash
npm install
node examples/basic-upload.js
```

## Project Structure
```
ai-storage-shelby/
├── src/
│   └── upload.js        # Upload utility
├── examples/
│   └── basic-upload.js  # Basic usage example
├── README.md
└── package.json
```

## Use Cases

- AI model version control on-chain
- Decentralized dataset storage
- Verifiable model provenance
- Cost-efficient alternative to S3

## Built With

- [Shelby Protocol](https://shelby.xyz)
- [Aptos Blockchain](https://aptoslabs.com)
- Node.js / TypeScript

## Author

[@erhnysr](https://github.com/erhnysr) — Building decentralized AI infrastructure
