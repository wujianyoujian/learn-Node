const serverBlog = require('./src/router/blog.js')
const serverUser = require('./src/router/user.js')
const querystring = require('querystring')
const { set, get } = require('./src/db/redis')

const addexpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
// 定义全局变量session
// let SESSION_DATA = {}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })
    return promise
}

const serverhandle = (req, res)=> {

    res.setHeader('Content-Type', 'application/json')

    path = req.url.split('?')[0]
    req.path = path
    
    //解析query
    req.query = querystring.parse(req.url.split('?')[1])

    //解析cookie,将cookie转化成对象的形式
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        let array = item.split('=')
        let key = array[0].trim()
        let value = array[1].trim()
        req.cookie[key] = value
    })

    // 解析session使用redis
    let needSetCookie = false
    let userId = req.cookie.userId
    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //初始化session
        set(userId, {})
    }
    //获取session
    req.sessionId = userId
    get(req.sessionId).then(data => {
        if(data == null) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = data
        }
        // postData的处理
        return getPostData(req)
    })
    .then((postData) => {
        req.body = postData
        
        // 处理blog路由
        const blogResult = serverBlog(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${addexpires()};`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        
        //处理user路由    
    
        const userResult = serverUser(req, res)
        if(userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${addexpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end('<h1 align="center">404 Not Found</h1>')

    })
}

module.exports = serverhandle