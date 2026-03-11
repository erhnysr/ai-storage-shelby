#!/bin/bash

MAX_RETRY=50
WAIT_SEC=30
FILE="ai-generated-api.json"
BLOB="vibe-outputs/auto-$(date +%s)-ai-generated-api.json"
EXPIRATION="2026-12-31"

echo ""
echo "=== SHELBY AUTO UPLOAD ==="
echo "Dosya    : $FILE"
echo "Max deneme: $MAX_RETRY"
echo "Bekleme  : ${WAIT_SEC}s"
echo ""

for i in $(seq 1 $MAX_RETRY); do
  echo "[$(date '+%H:%M:%S')] Deneme $i/$MAX_RETRY..."
  
  OUTPUT=$(shelby upload "$FILE" "$BLOB" -e "$EXPIRATION" 2>&1 << 'SHELBY_INPUT'
y
SHELBY_INPUT
)

  if echo "$OUTPUT" | grep -q "Upload complete"; then
    echo ""
    echo "SUCCESS! Upload tamamlandi!"
    echo "$OUTPUT" | grep -E "Aptos|Shelby Explorer|Expires"
    node src/index.js verify "$FILE"
    exit 0
  else
    echo "    Ag hazir degil, ${WAIT_SEC}s bekleniyor..."
    sleep $WAIT_SEC
  fi
done

echo ""
echo "MAX denemeye ulasildi. Shelby agi hala hazir degil."
echo "Daha sonra tekrar dene: bash auto-upload.sh"
