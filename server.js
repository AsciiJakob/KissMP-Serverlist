const express = require("express")
const app = express();
const axios = require('axios');

const alert = "";
var cache = {lastUpdated: Date.now()}
updateCache();

function updateCache() {
    return new Promise(resolve => {
        axios.get('http://kissmp.online:3692/0.4.1', {timeout: 1000}).then((apiRequest) => {
            console.log("api is succeeding");
            cache.lastUpdated = Date.now();
            cache.servers = apiRequest.data;
            for (const server in cache.servers) {
                let serversArray = Object.entries(cache.servers); // make an array of the servers so that we're able to use the sort function.
                serversArray.sort(function (a, b) { // sort the array of server-objects by which ones have the most players.
                    return b[1].player_count - a[1].player_count;
                });
                cache.servers = Object.fromEntries(serversArray); // convert the sorted serverlist back to an object.
            }
            resolve(true);
        })
        .catch((err) => {
            console.log("Api is failing");
            if (!cache.servers) {cache.servers = {none: true}}; // will create the object if it doesn't exist.
            cache.servers.error = err.code || true;
            cache.servers.age = cache.lastUpdated;
            resolve(true);
        })
    });
};
app.use(express.static(__dirname + '/public', {
    extensions: ['html']
}));

app.get("/getData", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow the api to be accessed from anywhere.
    res.setHeader('Cache-Control', 'no-store'); // Tells the browser not to cache this request.
    if (alert) cache.servers.alert = alert;
    if (cache.lastUpdated < Date.now() - 4000) { // if the cached serverlist is 4 seconds or more old.
        await updateCache();
        console.log("cache updated");
    }
    res.send(cache.servers);
});

app.listen(4001);
