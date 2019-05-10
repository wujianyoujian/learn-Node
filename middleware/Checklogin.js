const { ErrorModel, SuccessModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    if(req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel('末登录')
    )
}