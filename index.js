table_grid = [
    ['name', 'age', 'favfood', 'minecraft'],
    ['beasdlfjdlj', '179', 'borgurh', 'veteran'],
    ['wahahahah', '2', 'SPANAKOPITA', 'noob'],
    ['AAAAAAAA', '69420', 'E', 'speedrunner']
]

$(document).ready(function() {
    const dataTypeSelect = $("#data-type")
    const dataTypeSubmit = $("#request-data-type")
    const dispatchButton = $("#send-dispatch-signal")
    const logContainer = $("#log-container")
    const log = $("#log")
    const fetchedDataTable = $("#fetched-data-table")

    
    dataTypeSelect.change(dataTypeSelectChanged)
    dataTypeSubmit.click(userRequestDataType)
    dispatchButton.click(userSendDispatchSignal)
    dispatchButton.attr("disabled", false) // for now

    insertMatrixInTable(table_grid, fetchedDataTable)

    console.log(extractMatrixFromTable(fetchedDataTable))

    function userClickedHeaderSort() {
        header = $(this)
        table = header.parent()
        headerText = header.text()
    }

    function insertMatrixInTable(matrix, table) {
        table.empty()
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i]
            let newRowElement = $("<tr>")
            for (let j = 0; j < matrix[0].length; j++) {
                let cell = row[j]
                let newCellElement = null;
                if (i == 0) {
                    newCellElement = $("<th>")
                } else {
                    newCellElement = $("<td>")
                }
                newCellElement.text(cell)
                newRowElement.append(newCellElement)
            }
            table.append(newRowElement)
        }
    }

    function extractMatrixFromTable(table) {
        let matrix = []
        for (let r = 0; r < table.children().length; r++) {
            trElement = table.children().eq(r)
            let row = []
            for (let c = 0; c < trElement.children().length; c++) {
                tdElement = trElement.children().eq(c)
                row.push(tdElement.text())
            }
            matrix.push(row)
        }
        return matrix
    }

    function sortMatrixByColumn(matrix, targetColumn) {
        let tableHeaders = matrix.slice(0, 1)
        let tableElements = matrix.slice(1)
        let comparator = null
        if ($.isNumeric(tableElements[0][targetColumn])) {
            comparator = function(rowA, rowB) {
                targetA = parseFloat(rowA[targetColumn])
                targetB = parseFloat(rowB[targetColumn]) 
                return targetA > targetB ? 1 : -1
            }
        } else {
            comparator = (rowA, rowB) => rowA[targetColumn] > rowB[targetColumn] ? 1 : -1
        }
        tableElements.sort(comparator)
        return tableHeaders.concat(tableElements)
    }


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
        logMessage("Client requested data type " + dataType)
        requestDataType(dataType)
    }

    function dataTypeSelectChanged() {
        console.log("data-type-select changed")
        dataTypeSubmit.attr("disabled", dataTypeSelect.val() === "default-option")
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

    function userSendDispatchSignal() {
        console.log("SEnding dispatch signal")
        logMessage("Sending dispatch signal")
    }
});

