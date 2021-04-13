var serverListTable = document.querySelector(".serverList");
var serversData;

axios.get('/getData').then((response) => {
  serversData = response.data;

  if (serversData.alert) {
    displayAlert(serversData);
  }
  if (serversData.error) {
    displayError(serversData);
    return;
  }
  
  clearServerList();
  addServers(serversData);
});


function clearServerList() {
  serverListTable.innerHTML = ""; // remove all children
}

function addServers(servers) {
  for (const ip in servers) {
    // create element
    let serverRow = document.createElement("tr");
    serverRow.className = "serverCell"
    serverRow.id = ip;
    serverRow.onclick = () => {
      displayServerInfo(serverRow);
    }
    
    // parse server info
    const server = servers[ip];
    const cellValues = [
      limitLength(server.name, 100), // Server Name
      server.player_count+"/"+server.max_players, // Players
      limitLength(parseMap(server.map), 25), // Map
    ]
    // fill the server element with it's information
    for (let i=0; i < cellValues.length; i++) {
      let newCell = document.createElement("td");
      newCell.innerText = cellValues[i];
      serverRow.appendChild(newCell);
    }

    // add the row to the server table
    serverListTable.appendChild(serverRow);
  }
}

function displayServerInfo(row) {
  let detailsDiv = document.querySelector(".detailsDiv");
  detailsDiv.style.visibility = "visible";

  let oldSelection = document.querySelector(".selected");
  if (oldSelection) {
    oldSelection.classList.remove("selected"); // unselect previous selected server if we had one
    if (oldSelection.id == row.id) {
      detailsDiv.style.visibility = "hidden";
      return;
    }
  }
  row.classList.add("selected");

  let info = serversData[row.id];
  let valueElements = document.getElementsByClassName("detailsValue");

  let {name, description, map, player_count, max_players, version} = info;
  let serverInfo = [name, description, parseMap(map), player_count+"/"+max_players, row.id, version[0]+"."+version[1]];
  for (let i=0; i <valueElements.length; i++) { // fill all the values
    const element = valueElements[i]
    element.innerText = serverInfo[i];
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
  
function limitLength(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength-3)+"..."
  }
  return str;
}
function parseMap(mapPath) {
  try {
    return mapPath.match(/(?<=levels\/)(.*)(?=\/)/)[0]; // return everything inbetween "levels/" and the next "/"".
  }                                                     // For example; "/levels/east_coast_usa/info.json", would return just "east_coast_usa".
  catch {
    return mapPath;
  }
}