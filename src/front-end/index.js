$(function() {
    const dataTypeSelect = $("#data-type")
    const dataTypeSubmit = $("#request-data-type")
    const dispatchButton = $("#send-dispatch-signal")
    const logContainer = $("#log-container")
    const log = $("#log")
    const queryDataButton = $("#query-data-button")
    const canvas = document.getElementById("load-data-chart").getContext('2d')


    // button event bindings
    dataTypeSelect.on("change", dataTypeSelectChanged)
    dataTypeSubmit.on("click", userRequestDataType)
    dispatchButton.on("click", userSendDispatchSignal)
    queryDataButton.on("click", async function() {await userQueryData()})

    const loadDataChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: 'load'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Load (MW)'
                    }
                }
            }
        }
    })

    // testing
    dispatchButton.attr("disabled", false) // for now
    

    function logMessage(msg) {
        let isScrolledToBottom = logContainer.scrollTop() > -5
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

    async function userQueryData() {
        console.log('ZE BOHTON VAS PRESSD')
        try {
            const response = await fetch("http://localhost:3000/data")
            if (!response.ok)
                throw new Error("ZERE VAS A PROHBLEM FETCHING ZE DATAH1!!1!")
            const data = await response.json()
            updateChart(data)
        } catch {
            console.log("ERRRRORRRR FETCHING ZE DATAH")
        }
    }

    function updateChart(data) {
        console.log("YOOO DATA PASSED GIMMEH GIMME")
        console.log(data)
        loadDataChart.data.labels = data["time"]
        loadDataChart.data.datasets[0].data = data["load"]
        loadDataChart.update()
    }

    function DUMMYFUNKY() {
        console.log("FUNKYYYYYYYY")
    }

    
});

