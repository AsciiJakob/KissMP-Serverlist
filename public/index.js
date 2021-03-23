var serverListTable = document.querySelector(".serverList");
var data;

axios.get('/getData').then((res) => {
  data = res.data;
  if (data.alert) displayAlert(data);
  if (data.error) {
    displayError(data);
    return;
  }
  
  clearServerList();
  addServers(data);
  // displayServerInfo(document.querySelector(".serverCell")); // make the top-most server selected in the details section
});


function clearServerList() {
  serverListTable.innerHTML = ""; // remove all children
}

function addServers(servers) {
  for (const ip in servers) { // loop through all of the servers
    let serverContainer = document.createElement("tr"); // create the container/row for the server
    serverContainer.className = "serverCell"
    serverContainer.id = ip;
    serverContainer.onclick = () => {
      displayServerInfo(serverContainer);
    }
    
    const server = servers[ip];
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

function displayServerInfo(cell) {
  document.querySelector(".detailsDiv").style.visibility = "visible";
  let old = document.querySelector(".selected");
  if (old) old.classList.remove("selected"); // unselect previous selected one if we had one (:

  cell.classList.add("selected");
  let info = data[cell.id];
  let detailsDiv = document.querySelector(".detailsTextContainer");

  let {name, description, map, player_count, max_players, version} = info;
  values = [
    `Name: ${name}`,
    `Description: ${description}`,
    `Map: `+parseMap(map),
    `Players: ${player_count}/${max_players}`,
    `IP Address: ${cell.id}`,
    `Version: ${version[0]}.${version[1]}`
  ]
  for (let i=0; i < detailsDiv.children.length; i++) {
    let child = detailsDiv.children[i];
    child.innerText = values[i];
  }
}

  
function displayError(data) {
  let errorText = document.querySelector(".errorText");
  errorText.style.display = "block";
  correctDetailsHeight();
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
  correctDetailsHeight();
}



function correctDetailsHeight() { // makes the details div slightly shorter so the ERROR or ALERT text will fit.
  console.log("Correcting details div")
  document.querySelector(".detailsDiv").style.height = "31vh";

}
function parseMap(map) {
  return map.match(/(?<=levels\/)(.*)(?=\/)/)[0]; // return everything inbetween "levels/" and the next "/"".
}                                                 // For example; "/levels/east_coast_usa/info.json", would return just "east_coast_usa".
