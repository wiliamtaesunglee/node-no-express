import { Transform } from 'node:stream'
import http from 'node:http'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = chunk * -1
    console.log({ transformed })
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer((req, res) =>
  req
    .pipe(new InverseNumberStream())
    .pipe(res)
)

server.listen(3334)
