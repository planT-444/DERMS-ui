 import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getColumnNames(tableName) {
    let [columnRecords] = await con.query(
        `
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME=?;`, [tableName]
    )
    let columnNames = columnRecords.map((row) => row['COLUMN_NAME'])
    return columnNames
}

// need to add check for sql injection prevention
async function dataTableToMatrix(tableName) {
    let columnNames = await getColumnNames(tableName)
    let matrix = [columnNames]
    let [records] = await con.query(
        `
        SELECT * FROM ${tableName};`
    )
    for (let record of records) {
        matrix.push(Object.values(record))
    }

    return matrix
    
}

console.log(await dataTableToMatrix('notes'))
