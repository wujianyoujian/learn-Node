## 安装和使用express-generator

`npm install express-generator -g`

**创建项目**

`express blog`

中间件，用app.use,app.get
使用next()
* app.use()里只要父路由匹配到就会命中
* app.get()只能路由一致才行

安装session, redis, redis-connect

让session存在redis中

```
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const RedisClient = require('./db/redis')
```

在app.js中引入这些插件
引入redis-connect 末尾+ session就是像一个类的使用了

`const sessionStore = new RedisStore({
    client: RedisClient
})`

#### session在express的使用
```
app.use(session({
    secret: 'wxx13dJK_#',//密匙
    cookie: {
        path: '/',
        httpOnly: 'true',
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))
```
不需要设置res返回的类型了

在express中使用morgan对于日志的读写
[express/morgan](https://github.com/expressjs/morgan)

`
app.use(morgan('combined', {
    stream: writestream
}))
`

morgan里面的`combined`为日志的格式

理解express里的中间件原理
1. 先是三种常见的方法,app.use,app.get,app.post
2. 当我们使用这些方法时候,第一个参数为路由, 没有则默认为'/',其余参数就是中间件函数了。将一次调用到的所有中间件转化为数组形式和路由组成对象,再就把每一次信息都存储在数组中。
3. 之后就是根据请求的方法和你自己去请求的路由与后台定义的路由匹配, 就得到匹配到的中间件stack函数数组。
4. 最后就是next机制，取到中间件数组中的第一个中间件，带入req,res,next。如果第一个中间件函数中最后调用next方法，就会执行第二个中间件函数。

* 在本地运行与nodeJs的方法一致,然后我们把这个十分简单的博客项目部署到线上，使用pm2这个工具就可以很好的对我们的项目进行管理了,推荐在服务器上安装宝塔,很多东西可以直接安装,就不需要再远程连接安装了

[pm2参考网站](http://www.cnblogs.com/crazyWang/p/9713123.html)

***

[项目地址](http://39.106.176.121:8088)

