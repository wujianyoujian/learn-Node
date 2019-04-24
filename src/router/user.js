const logincheck = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

const serverUser = (req, res) => {

    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = logincheck(username, password)
        return result.then(data => {
            if(data.username) {
                return new SuccessModel()
            }
            return new ErrorModel('账号信息错误')
        })
    }
}

module.exports = serverUser
