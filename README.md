# Shelby Vibe Storage

Decentralized storage for AI-generated outputs — built on [Shelby Protocol](https://shelby.xyz) and Aptos blockchain.

## 🚀 Live on Testnet!

Successfully uploading and verifying AI-generated files on Shelby testnet.

- Upload time: ~12s
- SHA-256 hash verified on-chain
- Aptos transaction recorded on every upload

## The Problem

When using AI tools (vibe coding, image generation, model outputs), your generated files live on centralized servers. There is no way to prove:
- When you created something
- That it has not been modified
- Who originally generated it

## The Solution

Shelby Vibe Storage stores your AI-generated outputs on Shelby decentralized hot storage network and records a SHA-256 hash on Aptos blockchain — giving you verifiable proof of creation.

## Features

- Upload any AI-generated file to Shelby testnet
- SHA-256 hash recorded on Aptos blockchain
- Verify file integrity at any time
- Full upload history with timestamps
- No egress fees, access from anywhere

## Quick Start

### Install
```bash
npm install -g @shelby-protocol/cli
shelby init
git clone https://github.com/erhnysr/ai-storage-shelby
cd ai-storage-shelby
npm install
```

### Upload an AI-generated file
```bash
node src/index.js upload ./my-ai-output.json
```

### List all uploads
```bash
node src/index.js list
```

### Verify a file
```bash
node src/index.js verify ./my-ai-output.json
```

### Run the demo
```bash
node examples/vibe-demo.js
```

## How It Works
```
AI Tool → Generate Output → Shelby Vibe Storage → Shelby Testnet → Aptos Blockchain
                                                        ↓
                                              SHA-256 Hash Recorded
                                              Timestamp Immutable
                                              Verifiable Forever
```

## Use Cases

- Vibe coding outputs — prove you generated that code on this date
- AI image/audio generation — immutable proof of creation
- AI model weights — version control on-chain
- Dataset storage — no vendor lock-in, no egress fees

## Built With

- [Shelby Protocol](https://shelby.xyz) — Decentralized hot storage
- [Aptos Blockchain](https://aptoslabs.com) — Immutable hash records
- Node.js

## Author

[@erhnysr](https://github.com/erhnysr) — Building decentralized AI infrastructure
