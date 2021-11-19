
# KissMP-Serverlist
![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fkissmpservers.jakobs.work%2F) 
![Docker Status](https://img.shields.io/docker/cloud/build/asciijakob/kissmp-serverlist)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/AsciiJakob/KissMP-Serverlist)


An external server list for the BeamNG.drive multiplayer mod ["KissMP"](https://github.com/TheHellBox/KISS-multiplayer)

![Preview](https://i.imgur.com/O1l3lUn.jpeg)

The website is also hosted at [https://kissmpservers.jakobs.work](https://kissmpservers.jakobs.work/)

[DockerHub Repository](https://hub.docker.com/r/asciijakob/kissmp-serverlist)

# Running


## Deploying with docker-compose (best option not one command as bottom but, more stable and easier to manage)


1. Download docker-compose.yml from repo, or clone it
2. Go to folder with docker-compose.yml
3. If you want you can edit the `docker-compose.yml` before using, like change the port of app (change the 8080 do not touch port 4001 or app will stop working)
4. Do `docker-compose up -d`
5. Done ! :D


## Deploying with docker
Run a container with the image:

`docker run -d -p PORT:4001 asciijakob/kissmp-serverlist`

Replace PORT with whatever port you wish for the webserver to listen to.

## Without docker
`git clone https://github.com/AsciiJakob/KissMP-Serverlist.git`

`cd KissMP-Serverlist`

`npm install`

`node app.js`

