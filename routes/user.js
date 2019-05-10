var express = require('express');
const { logincheck, register }= require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')
var router = express.Router();

router.post('/login', function(req, res, next) {
    const { username, password} = req.body
    const result = logincheck(username, password)
    return result.then(data => {
        if(data.username) {
            req.session.username = data.username
            req.session.realname = data.realnam
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('账号信息错误')
        )
    })
});

router.get('/login-test', (req, res, next) => {
    if(req.session.username) {
        res.json({
            errno: 0,
            msg: '已登录'
        })
        return
    }
    res.json({
        errno: -1,
        msg: '没有登录'
    })
})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if(session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;