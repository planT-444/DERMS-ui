import db from '../models/index.cjs'
import defineLoadDataRecord from '../models/loadDataRecord.cjs'

const loadDataRecord = defineLoadDataRecord(db.sequelize)

await db.sequelize.sync()
console.log("connected to database")

// need to add check for sql injection prevention
async function getColumnMajorLoadData() {
    const fullRecords = await loadDataRecord.findAll()
    const plainRecords = fullRecords.map((fullRecord) => fullRecord.get())
    
    if (!plainRecords)
        return null
    const columnMajorData = {}
    for (let record of plainRecords) {
        for (let columnName in record) {
            if (!(columnName in columnMajorData))
                columnMajorData[columnName] = []
            columnMajorData[columnName].push(record[columnName])
        }
    }
    return columnMajorData

}

export {getColumnMajorLoadData}