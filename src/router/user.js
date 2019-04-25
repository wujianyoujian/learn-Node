const logincheck = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')
const { set } = require('../db/redis')

const addexpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const serverUser = (req, res) => {

    const method = req.method
    
    if(method === 'POST' && req.path === '/api/user/login') {
        const { username, password} = req.body
        const result = logincheck(username, password)
        return result.then(data => {
            if(data.username) {
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('账号信息错误')
        })
    }
    
    //验证登录测试
    // if(method === 'GET' && req.path === '/api/user/login-text') {
    //     if(req.session.username) {
    //         return Promise.resolve(new SuccessModel())
    //     }
    //     return Promise.resolve(new ErrorModel('没有信息'))
    // }
}

module.exports = serverUser
