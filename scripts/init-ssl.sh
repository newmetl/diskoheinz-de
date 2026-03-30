#!/bin/bash
# Einmalig nach DNS-Propagation ausführen
# Voraussetzung: Nginx muss gestoppt sein (Port 80 muss frei sein)
#   cd /srv && docker compose stop nginx
set -e

DOMAINS="-d diskoheinz.wojtek-gorecki.de"
EMAIL="wojtek@gorecki.de"

echo "=== SSL-Zertifikat für diskoheinz.wojtek-gorecki.de holen (Let's Encrypt) ==="

docker run --rm -p 80:80 \
  -v /srv/nginx/ssl:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  $DOMAINS --email $EMAIL --agree-tos --no-eff-email

echo "=== Fertig ==="
echo "Zertifikate liegen unter: /srv/nginx/ssl/live/diskoheinz.wojtek-gorecki.de/"
echo ""
echo "Nginx neu starten:"
echo "  cd /srv && docker compose up -d nginx"
echo ""
echo "Der bestehende Cronjob (certbot renew) erneuert dieses Zertifikat automatisch mit."
