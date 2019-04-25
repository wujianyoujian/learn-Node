const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

// 同一登录验证函数
const Rechecklogin = (req) => {
    if(!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const serverBlog = (req, res) => {
    const method = req.method
    const id = req.query.id || ''
    if(method === 'GET' && req.path === '/api/blog/list') {

        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listdata => {
            return new SuccessModel(listdata)
        })
    }

    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if(method === 'POST' && req.path === '/api/blog/new') {
        
        const loginResult = Rechecklogin(req)
        if(loginResult) {
            //没有登录
            return Rechecklogin
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then((data)=>{
            return new SuccessModel(data)
        })
    }

    if(method === 'POST' && req.path === '/api/blog/update') {
        const loginResult = Rechecklogin(req)
        if(loginResult) {
            //没有登录
            return Rechecklogin
        }
        const result =updateBlog(id, req.body)
        return result.then(value => {
            if(value) {
                return new SuccessModel()
            }
            return new ErrorModel('更新失败')
        })
    }
    
    if(method === "POST" && req.path === '/api/blog/del') {
        const loginResult = Rechecklogin(req)
        if(loginResult) {
            //没有登录
            return Rechecklogin
        }
        const author = req.session.username
        const result = delBlog(id, author)
        return result.then(value => {
            if(value) {
                return new SuccessModel()
            }
            return new ErrorModel('删除失败')
        })
    }

}

module.exports = serverBlog