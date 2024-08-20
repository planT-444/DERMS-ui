const validIPFormat = /^(\d+\.){3}\d+$/;
const validPortFormat = /^\d+$/;
const serverIP = document.getElementById("server-ip");
const serverPort = document.getElementById("server-port");
const serverConnect = document.getElementById("server-connect");
const connectionErrorMessage = document.getElementById("connection-error-message");
const dataTypeSelect = document.getElementById("data-type");
const dataTypeSubmit = document.getElementById("request-data-type");
const logContainer = document.getElementById("log-container");
const log = document.getElementById("log");

serverConnect.onclick = userConnectToServer;
dataTypeSelect.onchange = dataTypeSelectChanged;
dataTypeSubmit.onclick = userRequestDataType;


function logMessage(msg) {
    let msgElement = document.createElement("div");
    msgElement.textContent = msg;
    log.insertBefore(msgElement, log.firstChild);
}

function isValidIP(ip) {
    return ip.match(validIPFormat) != null;
}

function isValidPort(port) {
    return port.match(validPortFormat) != null;
}

function userConnectToServer() {
    let ip = serverIP.value;
    let port = serverPort.value;

    console.log("Connecting to server...");
    
    if (!isValidIP(ip)) {
        connectionErrorMessage.textContent = "Cannot connect: invalid server IP";
        console.log("Cannot connect: invalid server IP");
        return;
    }
    
    if (!isValidPort(port)) {
        connectionErrorMessage.textContent = "Cannot connect: invalid port";
        console.log("Cannot connect: invalid port");
        return;
    }
    

    if (!connectToServer(ip, port)) {
        connectionErrorMessage.textContent = "Cannot connect: server connection failed";
        console.log("Cannot connect: server connection failed");
        return;
    }

    connectionErrorMessage.textContent = "";
    dataTypeSelect.disabled = false;
    logContainer.style.backgroundColor = "white";
    logMessage(`Client connected to server! (${ip}:${port})`);
}

function userRequestDataType() {
    let dataType = dataTypeSelect.value
    console.log("Requesting data type: " + dataType);
    if (dataTypeSelect.value === "default-option") {
        connectionErrorMessage.textContent = "Please select an option";
        return;
    }

    logMessage("Client requested data type " + dataType);

    requestDataType(dataType)
}

function dataTypeSelectChanged() {
    dataTypeSubmit.disabled = dataTypeSelect.value === "default-option";
}



// backend starts here
function connectToServer(ip, port) {
    // do the backend stuff
    console.log("Backend: connecting to server...")
    return true;
}

function requestDataType(dataType) {
    console.log("Backend: requesting data type...")
    // do the backend stuff
}