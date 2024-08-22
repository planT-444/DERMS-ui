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

    let headerRowChildren = table.children().eq(0).children() // table has been overwritten: cannot do headerRow.children()
    
    for (let i = 0; i < headerRowChildren.length; i++) {
        let currentHeader = headerRowChildren.eq(i)
        if (currentHeader.text() === header.text()) {
            currentHeader.attr("class", reverse ? "sorted-column-reverse" : "sorted-column")
            break;
        }
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
        let trElement = table.children().eq(r)
        let row = []
        for (let c = 0; c < trElement.children().length; c++) {
            let tdElement = trElement.children().eq(c)
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
        comparator = function(rowA, rowB) {
            let targetA = parseFloat(rowA[targetColumn])
            let targetB = parseFloat(rowB[targetColumn]) 
            return targetA > targetB ? 1 : -1
        }
    } else {
        comparator = function(rowA, rowB) {
            let targetA = rowA[targetColumn].toLowerCase()
            let targetB = rowB[targetColumn].toLowerCase()
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

export {
    assignHeadersClickEvent,
    extractMatrixFromTable,
    insertMatrixIntoTable,
    sortedMatrixByColumn,
    userClickedHeaderSort
}