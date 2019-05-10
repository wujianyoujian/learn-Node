//获取环境参数
const env =process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if(env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'blog',
        password: 'nrR5CNiEWxewecpw',
        port: '3306',
        database: 'myblog'
    }
    // redis
    REDIS_CONF = {
        port: '6379',
        host: 'localhost'
    }
}

if(env === 'dev') {
    //mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'application222',
        port: '3306',
        database: 'myblog'
    }
    //redis
    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}