const fileName = process.argv[2];
const urlName = process.argv[3];
const fs = require('fs');
const axios = require('axios');

const readStream = fs.createReadStream(`./${fileName}`, { highWaterMark: 1 * 1024, encoding: 'base64' });

let count = 0;
readStream.on('data', async (chunk) => {
  await axios({
    method: 'post',
    url: `http://dontpad.com/${urlName}/${count++}`,
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: `text=${chunk}`,
  })
    .then((response) => {
      const { url } = response.config;
      console.log(url);
    });
});

process.on('exit', () => {
  console.log(`Done! 0 -> ${count}`);
});
