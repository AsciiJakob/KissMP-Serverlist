var serverListTable = document.querySelector(".serverList");

axios.get('/getData').then((res) => {
    clearServerList();
    addServers(res.data)
    
});


function clearServerList() {
  serverListTable.innerHTML = ""; // remove all children
}

function addServers(servers) {
  for (const num in servers) { // loop through all of the servers
        let serverContainer = document.createElement("tr"); // create the container/row for the server
        serverContainer.className = "serverCell"
        const server = servers[num];
        let cellValues = [
          server.name, // Server Name
          server.player_count+"/"+server.max_players, // Players
          parseMap(server.map), // Map
          server.ping || NaN // Ping
        ]
        for (let x=0; x < cellValues.length; x++) {
          let newCell = document.createElement("td");
          newCell.innerText = cellValues[x];
          serverContainer.appendChild(newCell);
        }

        serverListTable.appendChild(serverContainer); // add the row to the server table
    }
}

function parseMap(map) {
return map.match(/(?<=levels\/)(.*)(?=\/)/)[0]; // return everything inbetween "levels/" and the next "/"". For example; "/levels/east_coast_usa/info.json", would return just "east_coast_usa"
}
