## <font color="#ff0">开发接口</font>

* node.js处理http请求
* 搭建开发环境
* 开发接口(先不链接数据库，和不考虑登录的问题)
    
### <font color="#aaff00">http请求</font>

1. DNS解析，也就是将域名解析成IP地址。建立TCP链接，客户端和服务器进行链接，也就是三次握手。从客户端发送http请求
2. server接受到http请求，处理，并返回
3. 客户端就是浏览器收到数据，处理数据(渲染页面，执行js)

### <font color="#aaff00">搭建开发环境</font>
* 使用nodemon检测文件变化，自动重启
* 使用cross-env设置环境变量， 兼容mac，Linux，windows

在开发node.js项目的时候用到`npm init`来对项目进行初始化会生成`package.json`文件,会有项目的介绍和依赖包的版本号。在这里面可以在`script`里创建npm run 的命令
比如
```
"dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
```
这就是安装的工具，cross-env是环境变量，nodemon则是自动检测和重启node.js

安装依赖包或者库的时候就会生成package-lock.json
### <font color="#aaff00">流程和拆分</font>
http请求 -> 处理两种请求方式 -> 开发路由 -> 数据的模型 -> 数据层的操作

#### <font color="#aaff00">用promise处理POST请求及发送数据</font>