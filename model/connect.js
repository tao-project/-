/*
 * @Author: your name
 * @Date: 2020-10-16 15:08:08
 * @LastEditTime: 2020-11-14 14:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map\model\map.js
 */
const mysql = require('mysql')
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});
db.connect(err => {
    if (err) throw err;
    console.log('mysql数据库连接成功');
})
module.exports = {
    db
}