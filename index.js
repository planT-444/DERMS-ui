$(document).ready(function() {
    const validIPFormat = /^(\d+\.){3}\d+$/;
    const validPortFormat = /^\d+$/;
    const serverIP = $("#server-ip");
    const serverPort = $("#server-port");
    const serverConnect = $("#server-connect");
    const connectionErrorMessage = $("#connection-error-message");
    const dataTypeSelect = $("#data-type");
    const dataTypeSubmit = $("#request-data-type");
    const logContainer = $("#log-container");
    const log = $("#log");

    serverConnect.click(userConnectToServer);
    dataTypeSelect.change(dataTypeSelectChanged);
    dataTypeSubmit.click(userRequestDataType);

    function logMessage(msg) {
        let msgElement = $("<div>");
        msgElement.text(msg);
        $("#log").prepend(msgElement);
    }

    function isValidIP(ip) {
        return ip.match(validIPFormat) != null;
    }

    function isValidPort(port) {
        return port.match(validPortFormat) != null;
    }

    function userConnectToServer() {
        let ip = serverIP.val();
        let port = serverPort.val();


        console.log("Connecting to server...");
        
        if (!isValidIP(ip)) {
            connectionErrorMessage.text("Cannot connect: invalid server IP");
            console.log("Cannot connect: invalid server IP");
            return;
        }
        
        if (!isValidPort(port)) {
            connectionErrorMessage.text("Cannot connect: invalid port");
            console.log("Cannot connect: invalid port");
            return;
        }
        

        if (!connectToServer(ip, port)) {
            connectionErrorMessage.text("Cannot connect: server connection failed");
            console.log("Cannot connect: server connection failed");
            return;
        }
        console.log("yay")
        connectionErrorMessage.text("");
        dataTypeSelect.attr("disabled", false);
        logContainer.css("backgroundColor", "white");
        logMessage(`Client connected to server! (${ip}:${port})`);
    }

    function userRequestDataType() {
        let dataType = dataTypeSelect.val();
        console.log("Requesting data type: " + dataType);
        logMessage("Client requested data type " + dataType);
        requestDataType(dataType)
    }

    function dataTypeSelectChanged() {
        console.log("data-type-select changed");
        dataTypeSubmit.attr("disabled", dataTypeSelect.val() === "default-option");
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
});

