const { exec, escape } = require('../db/mysql')
const genPassword = require('../../utils/cryp')

const logincheck = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password) 
    const sql = `
        select username, realname from users where username=${username} and password=${password};
    `     
    // 这个查找到了就是返回有值的数组，没有就是undefine
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
const register = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql =`
        insert into users(username, password, realname) values(${username},${password},'default');
    `
    return exec(sql).then(insertuser=> {
        if(insertuser.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    logincheck,
    register
}