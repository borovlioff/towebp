import { join } from 'path';
import { readdirSync } from 'fs' 
const webp = require('webp-converter');


let dirpath = join(__dirname, '/images');
let outpath = join(__dirname, '/out');


async function start(){
  try {
    let listFile = readdirSync(dirpath,'utf8');
    listFile.forEach(file => {
      let name = file.replace(`.png`,``);
      let pngPath = join(dirpath, `${name}.png`);
      let webpPath = join(outpath, `${name}.webp`);
      
      const result = webp.cwebp(pngPath,webpPath,"-q 80");
      result.then((response) => {
      console.log(response);
});
    });
  } catch (error) {
    console.log(error)
  }
 
}

start();