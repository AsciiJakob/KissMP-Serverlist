
# KissMP-Serverlist
![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fkissmpservers.jakobs.work%2F) 
![Docker Status](https://img.shields.io/docker/cloud/build/asciijakob/kissmp-serverlist)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/AsciiJakob/KissMP-Serverlist)


An external server list for the BeamNG.drive multiplayer mod ["KissMP"](https://github.com/TheHellBox/KISS-multiplayer)

![Preview](https://i.imgur.com/Cd0FFmf.png)

The website is also hosted at [https://kissmpservers.jakobs.work](https://kissmpservers.jakobs.work/)

[DockerHub Repository](https://hub.docker.com/r/asciijakob/kissmp-serverlist)

# Running


## Deploying with docker-compose (best option, easiest to manage)

1. Download or copy the [docker-compose.yml](https://github.com/AsciiJakob/KissMP-Serverlist/blob/main/docker-compose.yml) file from this repo.
2. Place the `docker-compose.yml` file inside of a folder
3. Edit the `docker-compose.yml` file to your liking. If you want to change the port, change the "8080" part not "4001" (or the app will stop working).
4. Run `docker-compose up -d` within the same folder as the `docker-compose.yml` file
5. Done! :D

The app should then be available on the port set in your docker-compose file.


## Deploying with docker
Run a container with the image:

`docker run -d -p PORT:4001 asciijakob/kissmp-serverlist`

Replace PORT with whatever port you wish for the webserver to listen to.

## Without docker
`git clone https://github.com/AsciiJakob/KissMP-Serverlist.git`

`cd KissMP-Serverlist`

`npm install`

`node app.js`

