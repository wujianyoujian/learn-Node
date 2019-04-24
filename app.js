const serverBlog = require('./src/router/blog.js')
const serverUser = require('./src/router/user.js')
const querystring = require('querystring')

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
        console.log(key+''+ value)
        req.cookie[key] = value
    })

    // postData的处理
    getPostData(req).then((postData) => {
        req.body = postData
        
        // 处理blog路由
        const blogResult = serverBlog(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
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