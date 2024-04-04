import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
      }
    }, 1000)
  }
}

const oneToHundredStream = new OneToHundredStream();

fetch('http://localhost:3334', {
  method: 'POST',
  body: oneToHundredStream,
  duplex: 'half'
}).then(response => {
}).catch(error => {
  console.error('Error:', error);
});
