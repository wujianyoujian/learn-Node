const fs = require('fs')
const path = require('path')

function CreateWriteStream(filename) {
    let fullfilename = path.join(__dirname, '../', './', 'logs', filename)
    let writeStream = fs.createWriteStream(fullfilename, {
        flag: 'a'
    })
    return writeStream
}

function writeLOG(writeStream, log) {
    writeStream.write(log  + '\n')
}

//写访问的日志
const accesswriteStream = CreateWriteStream('access.log')
// log为内容
function access(log) {
    writeLOG(accesswriteStream, log)
}

module.exports = {
    access
}