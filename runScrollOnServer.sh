#!\bin\bash

docker stop mongodb
docker stop scroll

docker rm mongodb
docker rm scroll

docker pull mongo:latest
docker run -d --name mongodb mongo:latest

docker pull iucama/scroll:pr-1
docker run -d --name scroll -p 3000:3000 -v /etc/letsencrypt/live/lucacamastro.de:/usr/src/app/certs --env-file .env.scroll iucama/scroll:pr-1

#docker network create scroll-network
docker network connect scroll-network mongodb
docker network connect scroll-network scroll
