#!/bin/bash
# Einmalig nach DNS-Propagation ausführen
# Voraussetzung: Nginx muss gestoppt sein (Port 80 muss frei sein)
#   cd /srv && docker compose stop nginx
#
# Das Script erweitert (oder erstellt) das Zertifikat unter
# /srv/nginx/ssl/live/diskoheinz.wojtek-gorecki.de/ um die Produktions-Domain
# diskoheinz.de (+ www). Der Pfad bleibt identisch, daher ist keine Änderung
# an der nginx.conf nötig.
set -e

DOMAINS="-d diskoheinz.wojtek-gorecki.de -d diskoheinz.de -d www.diskoheinz.de"
EMAIL="hallo@wojtek-gorecki.de"

echo "=== SSL-Zertifikat für diskoheinz.de holen/erweitern (Let's Encrypt) ==="

docker run --rm -p 80:80 \
  -v /srv/nginx/ssl:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  --cert-name diskoheinz.wojtek-gorecki.de \
  $DOMAINS --email $EMAIL --agree-tos --no-eff-email --expand

echo "=== Fertig ==="
echo "Zertifikate liegen unter: /srv/nginx/ssl/live/diskoheinz.wojtek-gorecki.de/"
echo ""
echo "Nginx neu starten:"
echo "  cd /srv && docker compose up -d nginx"
echo ""
echo "Der bestehende Cronjob (certbot renew) erneuert dieses Zertifikat automatisch mit."
