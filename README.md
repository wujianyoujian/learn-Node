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
***
#### 启动数据库
`net start mysql`
#### 关闭数据库
`new stop mysql`

#### 修改密码
* mysql> ALTER user 'root'@'localhost' IDENTIFIED BY '123456';
#### 修改用户名
* update user set user='xly' where user='root';
<font color="#f66">注意MySQL需要在管理员下的命令行运行，否则就没有权限"></font>    
[csdn参考文章](https://www.cnblogs.com/laumians-notes/p/9069498.html)

[菜鸟网参考](http://www.runoob.com/mysql/mysql-install.html)

## 操作数据库

* 建库
    创建myblog数据库
* 建表
* 表操作
增 删 改 查
#### <font color="#aaf">增</font>
* insert into users(username,`password`,realname) values('zhangmazi','123456','张麻子');
    有些关键字需要用``来包裹
#### <font color="#aaf">删</font>
* delete from users where username like '%123%';
    企业中删除都是软删除，并不是真正的删除，可以进行恢复
#### <font color="#aaf">改</font>
* update users set username'zhangsan' where username='lisi';
#### <font color="#aaf">查</font>
* select username,password from users;
* select * from users where username='lisi';

`select version();`
查看mysql的版本号

下载mysql模块来操作数据库

[node连接mysql身份验证方式报错解决](https://blog.csdn.net/XDMFC/article/details/80263215#commentBox)

<font color="#f44">向数据库发送请求，返回的是一个数组，有时候需要的是一个对象，所以要根据实际的要求返回</font>
*** 
### 从cookie方面进行登录的开发
从服务端设置cookie

`res.setHeader('Set-Cookie',username=${username} path=/)`

查看cookie直接

`const cookieStr = req.header.cookie || {}`

** 从服务端对cookie进行限制，直接加上httpOnly即可
利用cookie来验证登录就是，后端从前端拿到的用户名和密码，进行验证，再将用户名设置到cookie中，
用path=/,这样整个路由下都可以访问。用expires来对cookie的保存进行时间上的限制**

这时候问题就出现了
会暴露username，非常危险
因此
#### 对于cookie，现在常用session

1.用cookie存储一个userId作为标识，来对应session里的存储对象
而session保存在server端。这样就不用担心username暴露的问题

2.先设置一个变量userId，判断有无，有再判断session里对应的值有没有，没有就初始化
userId为false则用一个时间+随机数作为唯一的值,进行初始化，最后都赋值给session进行初始化

3.再在登录路由的时候对session进行赋值。

#### 安装redis

[参考网站](http://www.runoob.com/redis/redis-install.html)

* 启动redis服务

`redis-server.exe redis.windows.conf`

* 设置,获取,删除

`set mykey abc, get mykey, keys *, del mykey`

同样在使用node.js连接redis之前需要安装redis模块
