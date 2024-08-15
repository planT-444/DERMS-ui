$(document).ready(function() {
    const dataTypeSelect = $("#data-type");
    const dataTypeSubmit = $("#request-data-type");
    const logContainer = $("#log-container");
    const log = $("#log");

    dataTypeSelect.change(dataTypeSelectChanged);
    dataTypeSubmit.click(userRequestDataType);

    function logMessage(msg) {
        console.log("hi")
        let isScrolledToBottom = logContainer.scrollTop() > -5;
        console.log(logContainer.scrollTop());
        console.log(isScrolledToBottom)
        let msgElement = $("<div>");
        msgElement.text(msg);
        log.append(msgElement);
        if (isScrolledToBottom) {
            logContainer.scrollTop(0);
        }
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

