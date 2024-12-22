#!\bin\bash

CERT_PATH="/etc/letsencrypt/live/lucacamastro.de"

sudo docker stop mongodb
sudo docker stop scroll

sudo docker rm mongodb
sudo docker rm scroll

sudo docker pull mongo:latest
sudo docker run -d --name mongodb mongo:latest

sudo docker pull iucama/scroll:pr-1
sudo docker run -d --name scroll -p 3000:3000 \
    -v $CERT_PATH:/usr/src/app/certs \
    -e APP_ID="$APP_ID" \
    -e DISCORD_TOKEN="$DISCORD_TOKEN" \
    -e PUBLIC_KEY="$PUBLIC_KEY" \
    -e SESSION_SECRET="$SESSION_SECRET" \
    iucama/scroll:pr-1

#docker network create scroll-network
sudo docker network connect scroll-network mongodb
sudo docker network connect scroll-network scroll
