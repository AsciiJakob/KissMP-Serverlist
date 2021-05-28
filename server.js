const express = require("express")
const app = express();
const axios = require('axios');

var cache = {
    lastUpdated: Date.now(),
    data: {}
}
updateCache();

function updateCache() {
    return new Promise(resolve => {
        axios.get('http://kissmp.online:3692/latest', {timeout: 1000}).then(apiRequest => {
            console.log("api is succeeding");
            cache.lastUpdated = Date.now();
            cache.data = {
                servers: sortByPlayercount(apiRequest.data)
            };
            resolve();
        })
        .catch((err) => {
            console.log("Api is failing");
            if (!cache.data.servers) {
                cache.data.servers = {none: true}
            };
            cache.data.error = err.code || true;
            cache.data.age = cache.lastUpdated;
            resolve();
        })
    });
};
app.use(express.static(__dirname + '/public', {
    extensions: ['html']
}));

app.get("/getData", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow the api to be accessed from other domains.
    res.setHeader('Cache-Control', 'no-store'); // Tells the browser not to cache this request.
    if (cache.lastUpdated < Date.now() - 4000) {
        await updateCache();
        console.log("cache updated");
    }
    res.send(cache.data);
});

app.listen(4001);


function sortByPlayercount(servers) {
    let serversArray = Object.entries(servers); // make an array of the servers so that we're able to use the sort function.
    serversArray.sort((a, b) => b[1].player_count - a[1].player_count);
    return Object.fromEntries(serversArray);
}