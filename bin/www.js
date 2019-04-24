const http = require('http')
const serverhandle = require('../app.js')

const port = 8000

const server = http.createServer(serverhandle)

server.listen(port, () => {
    console.log('http://localhost:8000 OK')
})