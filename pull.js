const fileName = process.argv[2];
const urlName = process.argv[3];

const fs = require('fs');
const axios = require('axios');

const writeStream = fs.createWriteStream(`./${fileName}`, { flags: 'a' });

const getFile = async count => {
  const url = `http://dontpad.com/${urlName}/${count}`
  axios({
    method: 'get',
    url: url
  }).then(({ data }) => {
    return data.substring(
      data.search(`<textarea id="text">`) + 20,
      data.search(`</textarea>`)
    );
  }).then(result => {
    if (result != '') {
      console.log(url);
      writeStream.write(result);
      getFile(++count);
    }
  })
}

getFile(0)
