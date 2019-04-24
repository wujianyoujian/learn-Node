const logincheck = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')
const addexpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const serverUser = (req, res) => {

    const method = req.method

    if(method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password} = req.query
        const result = logincheck(username, password)
        return result.then(data => {
            if(data.username) {
                res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${addexpires()}`)
                return new SuccessModel()
            }
            return new ErrorModel('账号信息错误')
        })
    }
    
    //验证登录测试
    if(method === 'GET' && req.path === '/api/user/login-text') {
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('没有信息'))
    }
}

module.exports = serverUser
