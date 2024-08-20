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
    dataTypeSelect.on("change", dataTypeSelectChanged)
    dataTypeSubmit.on("click", userRequestDataType)
    dispatchButton.on("click", userSendDispatchSignal)
    
    // table setup
    insertMatrixIntoTable(table_grid, fetchedDataTable)

    // testing
    dispatchButton.attr("disabled", false) // for now
    console.log(extractMatrixFromTable(fetchedDataTable))
    

    function assignHeadersClickEvent(table) {
        let headerRowChildren = table.children().eq(0).children()
        for (let i = 0; i < headerRowChildren.length; i++) {
            headerRowChildren.eq(i).click(userClickedHeaderSort)
        }
    }

    function userClickedHeaderSort() {
        let header = $(this)
        let headerRow = header.parent()
        let table = headerRow.parent()
        let matrix = extractMatrixFromTable(table)

        let headerColumn = headerRow.children().index(header)
        let headerSortedStatus = header.attr("class")
        let reverse = headerSortedStatus === "sorted-column"
        let sortedMatrix = sortedMatrixByColumn(matrix, headerColumn, reverse = reverse)
        insertMatrixIntoTable(sortedMatrix, table)

        headerRowChildren = table.children().eq(0).children() // table has been overwritten: cannot do headerRow.children()
        
        console.log('\n')
        for (let i = 0; i < headerRowChildren.length; i++) {
            console.log(i)
            let currentHeader = headerRowChildren.eq(i)
            console.log(currentHeader.text(), header.text())
            if (currentHeader.text() === header.text()) {
                console.log("woah!")
                currentHeader.attr("class", reverse ? "sorted-column-reverse" : "sorted-column")
                console.log("breaking", currentHeader.text === header.text())
                break;
            }
            console.log(currentHeader.attr("class"))
        }

        // console.log(headerSortedStatus, reverse)

    }

    function insertMatrixIntoTable(matrix, table) {
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
        assignHeadersClickEvent(table)
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

    function sortedMatrixByColumn(matrix, targetColumn, reverse = false) {
        let tableHeaders = matrix.slice(0, 1)
        let tableElements = matrix.slice(1)
        let comparator = null
        let isNumeric = true
        for (let i = 0; i < tableElements.length; i++) {
            if (!$.isNumeric(tableElements[i][targetColumn])) {
                isNumeric = false
                break
            }
        }
        if (isNumeric) {
            console.log("sorting by numerical value")
            comparator = function(rowA, rowB) {
                targetA = parseFloat(rowA[targetColumn])
                targetB = parseFloat(rowB[targetColumn]) 
                return targetA > targetB ? 1 : -1
            }
        } else {
            console.log("sorting by lexographical value")
            comparator = function(rowA, rowB) {
                targetA = rowA[targetColumn].toLowerCase()
                targetB = rowB[targetColumn].toLowerCase()
                return targetA > targetB ? 1 : -1
            }
        }
        if (reverse) {
            tableElements.sort((rowA, rowB) => comparator(rowB, rowA))
        } else {
            tableElements.sort(comparator)
        }
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

