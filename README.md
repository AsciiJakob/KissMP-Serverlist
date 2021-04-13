# KissMP-Serverlist
![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fkissmpservers.jakobs.work%2F) 
![Docker Status](https://img.shields.io/docker/cloud/build/asciijakob/kissmp-serverlist)
![Git Commits](https://img.shields.io/github/commit-activity/m/AsciiJakob/KissMP-Serverlist)


A serverlist for the Beamng Drive multiplayer mod [KissMP](https://github.com/TheHellBox/KISS-multiplayer)

~~[Old Image Preview](https://imgur.com/TD8Nevp) ~~

[Image Preview](https://i.imgur.com/O1l3lUn.jpeg)

The website is also hosted at: [https://kissmpservers.jakobs.work](https://kissmpservers.jakobs.work/)

[DockerHub Repository](https://hub.docker.com/r/asciijakob/kissmp-serverlist)

# Running

## Deploying with docker
Run a container with the image:

`docker run -d -p PORT:4001 asciijakob/kissmp-serverlist`

Replace PORT with whatever port you wish the webserver to listen on.

## Without docker
`git clone https://github.com/AsciiJakob/KissMP-Serverlist.git`

`cd KissMP-Serverlist`

`npm install`

`node app.js`
