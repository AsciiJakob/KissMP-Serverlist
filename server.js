 const express = require("express")
const app = express();
const axios = require('axios');

var cache = {}
updateCache();
function updateCache() {
    return new Promise(async resolve => {
        const apiRequest = await axios.get('http://51.210.135.45:3692/');
        cache.age = Date.now();
        cache.servers = apiRequest.data;
        for (const server in cache.servers) {
            let serversArray = Object.entries(cache.servers); // make an array of the servers so that we're able to use the sort function.
            serversArray.sort(function (a, b) { // sort the array of server-objects by which ones have the most players.
                return b[1].player_count - a[1].player_count;
            });
            cache.servers = Object.fromEntries(serversArray); // convert the sorted serverlist back to an object.
        }
        resolve(true);
    });
};
app.use(express.static(__dirname + '/public', {
    extensions: ['html']
}));

app.get("/getData", async (req, res) => {
    if (cache.age < Date.now() - 4000) { // if the cached serverlist is 4 seconds or more old. A more appropriate name for "cache.age" would be "cache.dateOfBirth", but yeah...
        await updateCache();
        console.log("cache updated");
    }
    // let cacheSecondsLeft = Math.round(((cache.age - Date.now()) + 4000) / 1000);
    // res.setHeader('Cache-Control', `max-age=${cacheSecondsLeft}, must-revalidate`);
    // spent ages trying to get this working on firefox but never did. Worked fine on chrome. 
    // so i'll make the client not do any caching at all. It doesn't really matter, i'm just being nit-picky.
    res.setHeader('Cache-Control', 'no-store');

    res.send(cache.servers);
});

app.listen(4200);