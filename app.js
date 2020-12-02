/*
 * @Author: your name
 * @Date: 2020-10-16 14:56:32
 * @LastEditTime: 2020-12-02 12:54:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map\app.js
 */

const express = require('express')
const path=require('path')
const app = express()
// 生成token
const jwt = require('jsonwebtoken');
const secret='hello'
// 处理post参数
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
// // 开放静态文件
app.use(express.static(path.join(__dirname, 'public')))
// 请求跨域问题
var allowCrossDomain = function (req, res, next) {
        // 请求源 ajax http://localhost:8080
        res.header("Access-Control-Allow-Origin", "*");
        // 请求头  x-token
        res.header("Access-Control-Allow-Headers", "*");
        // 请求方法  post get put delete patch
        res.header("Access-Control-Allow-Methods", "*");
    
       // 下一步
    
        next();
    
    }
    app.use(allowCrossDomain);
    
//连接mysql数据库
require('./model/connect')
const index=require('./router/index.js')
app.use('/',index)
app.listen(3000)
console.log('网站服务器启动成功');