# KissMP-Serverlist
A serverlist for the Beamng Drive multiplayer mod "KissMP"

[Preview](https://imgur.com/TD8Nevp)
Hosted at: [https://www.kissmpservers.jakobs.work](https://kissmpservers.jakobs.work/)

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