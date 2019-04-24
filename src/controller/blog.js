const { exec } = require('../db/mysql')
// 从这里获取数据
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    //从客户端拿到的数据进行处理
    const title = blogData.title
    const content = blogData.content
    const createTime = Date.now()
    const author = blogData.author

    const sql = `
        insert into blogs(title,author,content,createTime) values('${title}','${author}','${content}',${createTime})
    `
    return exec(sql).then((insertData)=> {
        console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // 更新博客文章的id，和内容
    const title = blogData.title
    const content = blogData.content
    const sql = `
        update blogs set title='${title}',content='${content}' where id=${id};
    `
    return exec(sql).then(updateData=> {
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    const sql = `
        delete from blogs where id='${id}' and author='${author}';
    `
    return exec(sql).then(delData => {
        if(delData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}