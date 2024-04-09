import { Transform } from 'node:stream'
import http from 'node:http'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = chunk * -1
    console.log({ transformed })
    callback(null, Buffer.from(String(transformed)))
  }
}

const serverOld = http.createServer((req, res) =>
  req
    .pipe(new InverseNumberStream())
    .pipe(res)
)

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log({ fullStreamContent })

  return res.end(fullStreamContent)
})


server.listen(3334)
