const { exec } = require('../db/mysql')

const logincheck = (username, password) => {
    const sql = `
        select username, realname from users where username='${username}' and password='${password}';
    `     
    // 这个查找到了就是返回有值的数组，没有就是undefine
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
} 

module.exports = logincheck