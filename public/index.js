var serverListTable = document.querySelector(".serverList");
var serversData;

axios.get("/getData").then((response) => {
  serversData = response.data;
  clearServerList();
  
  if (serversData.error) {
    displayError(serversData);
    return;
  }
  
  addServers(serversData);
});


function clearServerList() {
  serverListTable.innerHTML = ""; // removes all child elements
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
    for (cellValue in cellValues) {
      let newCell = document.createElement("td");
      newCell.innerText = cellValues[cellValue];
      serverRow.appendChild(newCell);
    }

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
  for (let i=0; i < valueElements.length; i++) { // fill all the values
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
  const howOld = Math.round((Date.now() - data.age) / 60000);
  errorText.innerText = "Failed to fetch new information from the server, results below are "+howOld+" Minutes old.";
  addServers(data);
}


function correctDetailsHeight() { // makes the details div slightly shorter so the ERROR text will fit.
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
    return mapPath.split("levels/")[1].split("/")[0];
  }
  catch {
    return mapPath;
  }
}