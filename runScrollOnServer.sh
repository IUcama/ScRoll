#!\bin\bash

sudo docker stop mongodb
sudo docker stop scroll

sudo docker rm mongodb
sudo docker rm scroll

sudo docker pull mongo:latest
sudo docker run -d --name mongodb mongo:latest

sudo docker pull iucama/scroll:pr-1
sudo docker run -d --name scroll -p 3000:3000 -v /etc/letsencrypt/live/lucacamastro.de:/usr/src/app/certs --env-file .env.scroll iucama/scroll:pr-1

#docker network create scroll-network
sudo docker network connect scroll-network mongodb
sudo docker network connect scroll-network scroll
