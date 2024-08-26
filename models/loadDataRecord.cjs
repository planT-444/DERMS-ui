const {DataTypes} = require("sequelize")

function defineLoadDataRecord(sequelize) {
    const loadDataRecord = sequelize.define("load_data", {
        load: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    })
    return loadDataRecord
}

module.exports = defineLoadDataRecord