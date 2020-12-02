/*
 * @Author: your name
 * @Date: 2020-10-16 15:44:01
 * @LastEditTime: 2020-12-02 22:50:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \服务端\router\index.js
 */
// 请求express框架
const express = require('express');
// 连接mysql数据库
const { db}  = require('../model/connect.js');
// 登录成功生成token
const jwt=require("jsonwebtoken")
const router = express.Router();
router.post('/login', function (req, res) {
    let { username, password, value } = req.body
    // 根据value不同的值查询不同的表 学生账号-->0  老师账号-->1
    let table=value==0?'user':'teacher'  
    let sql = `select *from ${table} where username='${username}' and password='${password}'`
    db.query(sql, function (err, result) {
        if(err){
            console.log('数据对接失败',err.message);
            return;
        }
        if (result.length==0) {
            res.send({
                msg: '用户不存在或者密码错误',
                status:404,
                data:null
            })
            return
        }
        // 生成登录成功taoken
        let token = jwt.sign({ username, username }, 'daxunxun', {
            expiresIn: 60*60*24// 授权时效24小时
        })
        let dataString = JSON.stringify(result)
        let data = JSON.parse(dataString)
        res.send({
            
            meta:{status: 200, msg: '登录成功',  token},
           
            data: data[0],
          
        })
    })
})
router.post('/addUser', function (req, res) {
    let { username, password,email,tel } = req.body
    let findOne=`select *from user where username='${username}'`
    let insert = `insert into user(username,password,email,tel) values('${username}','${password}','${email}','${tel}')`
    //判断该用户名是否已经存在
    db.query(findOne, function (err, result) {
        // 该用户存在
        if (result.length!==0) {
            res.send({ status: 400, msg: '该用户已经存在' })
            return
        } else {
            // 请求插入数据
            db.query(insert, function (err, result) {
                if (err) {
                    res.send({ err, msg: '发生了一点错误', status: 400 })
                } else {
                    res.send({
                        status: 200,
                        msg: '用户注册成功'
                    })
                }
            })
        }
    })
})
router.delete('/demo_del',(req, res, next)=> {
    let params = req.body.id;
    if(params){
      connection.query(`DELETE  FROM  student_info  WHERE id = ${params} ;`, function(err,result){
        if(err){
          res.send("删除失败"+err);
        }else {
          console.log(result,'删除')
          res.send("删除成功");
        }
      });
    }
  })


module.exports = router;