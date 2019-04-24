const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

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
        const author = 'zhangsan'
        req.body.author = author
        const result = newBlog(req.body)
        return result.then((data)=>{
            return new SuccessModel(data)
        })
    }

    if(method === 'POST' && req.path === '/api/blog/update') {
        const result =updateBlog(id, req.body)
        return result.then(value => {
            if(value) {
                return new SuccessModel()
            }
            return new ErrorModel('更新失败')
        })
    }
    
    if(method === "POST" && req.path === '/api/blog/del') {
        const author = 'zhangsan'
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