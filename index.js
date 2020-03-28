const fileName = process.argv[2];
const urlName = process.argv[3];
const fs = require('fs');
const axios = require('axios');
const readStream = fs.createReadStream(`./${fileName}`,{ highWaterMark: 1 * 1024, encoding: 'base64' });
let count = 0;

readStream.on('data', async function(chunk) {
    console.log(count);
    const result = await axios({
      method: 'post',
      url: `http://dontpad.com/${urlName}/${count++}`,
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: `text=${chunk}`
    })
}).on('end', function() {
    console.log('OK');
});
