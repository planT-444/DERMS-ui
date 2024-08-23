 import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getColumnNames(tableName) {
    let [columnRecords] = await pool.query(
        `
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME=?;`, [tableName]
    )
    let columnNames = columnRecords.map((row) => row['COLUMN_NAME'])
    return columnNames
}

// need to add check for sql injection prevention
async function getColumnMajorData(tableName) {
    const [records] = await pool.query(
        `
        SELECT * FROM ${tableName}`
    )
    if (!records)
        return null
    const columnMajorData = {}
    for (let record of records) {
        for (let columnName in record) {
            if (!(columnName in columnMajorData))
                columnMajorData[columnName] = []
            columnMajorData[columnName].push(record[columnName])
        }
    }
    return columnMajorData

}

console.log(await getColumnMajorData('notes'))
