const webp = require('webp-converter');



export class WebpConvertService{

  async pngToWebp(path:string,outpath:string,quality:number){
    const result = webp.cwebp(path, outpath, `-q ${quality}`);
    result.then((response) => {
      console.log(response);
    });
  }
}