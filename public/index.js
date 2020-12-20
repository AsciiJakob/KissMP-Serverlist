var serverListTable = document.querySelector(".serverList");

axios.get('/getData').then((res) => {
  let data = res.data;
  if (data.alert) displayAlert(data);
  if (data.error) {
    displayError(data);
    return;
  }
  
  clearServerList();
  addServers(data);
});


function clearServerList() {
  serverListTable.innerHTML = ""; // remove all children
}

function addServers(servers) {
  for (const num in servers) { // loop through all of the servers
        let serverContainer = document.createElement("tr"); // create the container/row for the server
        serverContainer.className = "serverCell"
        const server = servers[num];
        const cellValues = [
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

  
function displayError(data) {
  let errorText = document.querySelector(".errorText");
  errorText.style.display = "block";
  if (data.none) {
    errorText.innerText = "Failed to fetch the serverlist.";
    return;
  }
  const howOld = Math.round((Date.now() - data.age) / 1000);
  errorText.innerText = "Failed to fetch new information from the server, results below are "+howOld+" seconds old.";
  clearServerList();
  addServers(data);
}

function displayAlert(data) {
  let alertText = document.querySelector(".alertText");
  alertText.style.display = "block";
  alertText.innerText = data.alert;
}