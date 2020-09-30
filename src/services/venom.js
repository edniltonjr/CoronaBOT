import * as venom from 'venom-bot';
import start from './sendMessage';

const venomStartClient = () => venom
.create(
  'covid',
  (base64Qr) => {
    const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    const imageBuffer = response;
    require('fs').writeFile(
      'qr.png',
      imageBuffer['data'],
      'binary',
      function (err) {
        if (err != null) {
          console.log(err);
        }
      }
    );
  },
  undefined,
  { logQR: false }
)
.then((client) => {
  start(client);
})

export default venomStartClient