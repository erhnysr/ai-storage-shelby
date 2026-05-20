# SHELBY VIBE STORAGE - PROJE HAFIZASI

## KISISEL BILGILER
- GitHub: erhnysr
- Twitter: @Erhnyasar
- Email: erhanyasarx@gmail.com
- Telegram: @erhnysr
- Mac Apple Silicon (yeni kullanici: macbookpro)

## PROJE OZETI
- Repo: https://github.com/erhnysr/ai-storage-shelby
- Live URL: https://shelby-vibe-storage-production.up.railway.app
- Konsept: Vibe coding outputlarini Shelby Protocol uzerinde sakla, SHA-256 ile Aptos blockchain dogrula, paylasilabilir link olustur

## KURULUM DURUMU
- Node.js v24.15.0 kurulu
- Shelby CLI v0.0.27 kurulu
- Default context: testnet
- Proje: ~/Projects/ai-storage-shelby
- Mac kullanici adi: macbookpro

## PROJE DOSYA YAPISI
- src/index.js          CLI (upload, download, list, verify)
- examples/vibe-demo.js Demo script
- web/server.js         Express backend
- web/public/index.html Ana sayfa
- web/public/download.html Download sayfasi
- web/drops.json        Upload veritabani
- nixpacks.toml         Railway deploy config

## CLI KOMUTLARI
- node src/index.js upload <dosya>
- node src/index.js download <numara>
- node src/index.js list
- node src/index.js verify <dosya>
- node examples/vibe-demo.js
- node web/server.js
- railway up

## KRITIK TEKNIK DETAYLAR
- Railway PORT: process.env.PORT || 3000
- Shelby upload: shelby upload <dosya> <blob> -e <tarih> --assume-yes
- Shelby context: testnet
- drops.json: web/ klasorunde

## DISCORD DURUMU
- Early Access rolu alindi
- creations kanali: proje paylasildi
- ShelbyBS showcase: gonderildi
- Live URL moderatore iletildi

## RAILWAY DEPLOY
- URL: shelby-vibe-storage-production.up.railway.app
- Deploy: railway up

## SIRADAKI ADIMLAR
1. ShelbyBS listesine eklenmesini bekle
2. Gunluk upload yap
3. Discord GM yaz
4. Twitter paylasim yap
5. Yeni ozellikler ekle

## YENI SOHBETTE DEVAM
"https://github.com/erhnysr/ai-storage-shelby reposundaki CLAUDE.md dosyasini oku ve kaldigimiz yerden devam et"
