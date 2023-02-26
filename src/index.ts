import * as http from 'node:http'

const PORT = 3009

http
  .createServer((req, res) => {
    res.writeHead(200)
    res.end('Habari Dunia!')
  })
  .listen(PORT)

console.log(`Server running at http://127.0.0.1:${PORT}/`)
