const mysql = require('promise-mysql');
const upsert = require('mysql-upsert');

/*
const createTableSql = `CREATE TABLE IF NOT EXISTS ark_etf_daily_snapshot(
    etf_name VARCHAR(50) NOT NULL,
    holding_date DATE,
    company_name VARCHAR(256) NOT NULL,
    ticker VARCHAR(30),
    cusip VARCHAR(50) NOT NULL,
    shares INT,
    market_value DOUBLE,
    weight_in_etf FLOAT,
    PRIMARY KEY (etf_name, holding_date, ticker, cusip)
    );`;
*/

const dbConfig = {
    host: 'localhost',
    user: 'offlineread',
    password: 'Offlineread@2020',
    database: 'arkfund'
};

async function upsertEtfData(data) {
    const connection = await mysql.createConnection(dbConfig);
    // upsert(mysqlConnection)(table, data, fields)
    const {affectedRows} = await upsert(connection)('ark_etf_daily_snapshot', data)
    await connection.end();
    return affectedRows;
}

module.exports = {
    upsertEtfData
}
