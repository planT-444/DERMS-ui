table_grid = [
    ['name', 'age', 'favfood', 'minecraft'],
    ['beasdlfjdlj', '179', 'borgurh', 'veteran'],
    ['wahahahah', '2', 'SPANAKOPITA', 'noob'],
    ['AAAAAAAA', '69420', 'E', 'speedrunner']
]

$(function() {
    const dataTypeSelect = $("#data-type")
    const dataTypeSubmit = $("#request-data-type")
    const dispatchButton = $("#send-dispatch-signal")
    const logContainer = $("#log-container")
    const log = $("#log")
    const fetchedDataTable = $("#fetched-data-table")

    // button event bindings
    // dataTypeSelect.on("change", dataTypeSelectChanged)
    // dataTypeSubmit.on("click", userRequestDataType)
    // dispatchButton.on("click", userSendDispatchSignal)
    dataTypeSelect.change(dataTypeSelectChanged)
    dataTypeSubmit.click(userRequestDataType)
    dispatchButton.click(userSendDispatchSignal)
    
    // table setup
    insertMatrixIntoTable(table_grid, fetchedDataTable)

    // testing
    dispatchButton.attr("disabled", false) // for now
    console.log(extractMatrixFromTable(fetchedDataTable))
    

    


    function logMessage(msg) {
        console.log("hi")
        let isScrolledToBottom = logContainer.scrollTop() > -5
        console.log(logContainer.scrollTop())
        console.log(isScrolledToBottom)
        let msgElement = $("<div>")
        msgElement.text(msg)
        log.append(msgElement)
        if (isScrolledToBottom) {
            logContainer.scrollTop(0)
        }
    }

    function userRequestDataType() {
        let dataType = dataTypeSelect.val()
        console.log("Requesting data type: " + dataType)
        logMessage("VM1 requested data type " + dataType)
        requestDataType(dataType)
    }

    function dataTypeSelectChanged() {
        console.log("data-type-select changed")
        dataTypeSubmit.attr("disabled", dataTypeSelect.val() === "default-option")
    }
    

    function requestDataType(dataType) {
        console.log("Backend: requesting data type...")
        // do the backend stuff
    }

    function userSendDispatchSignal() {
        console.log("SEnding dispatch signal")
        logMessage("Sending dispatch signal")
    }
});

