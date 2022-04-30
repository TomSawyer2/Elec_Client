// 添加环境变量
const dotenv = require('dotenv');
dotenv.config('./env');

const axios = require('axios');
const convert = require('xml-js');
const mysql = require('mysql');
const db = require('./config/db');
const connection = mysql.createConnection(db.mysql);
connection.connect(() => {
    console.log('Connected to MySQL');
});

const url = process.env.QUERY_URL;

const schedule = require('node-schedule');
const scheduleCronstyle = () => {
    schedule.scheduleJob('0 0 11 * * *', () => {
        console.log('轮询周期到--11:00');
        getRemainPower();
    });
    schedule.scheduleJob('0 0 23 * * *', () => {
        console.log('轮询周期到--23:00');
        getRemainPower();
    });
}

scheduleCronstyle();

const getRemainPower = () => {
    axios.get(url).then((res) => {
        const json = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 4 }));
        const remainPower = json.resultHKRemainPower.remainPower._text;
        const date = new Date().toISOString();
        const params = { remain_power: Number(remainPower).toFixed(2), date: date };
        connection.query('insert into elec_record set ?', params, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Inserted successfully, current remain power is ${remainPower}`);
            }
        })
    })
}
