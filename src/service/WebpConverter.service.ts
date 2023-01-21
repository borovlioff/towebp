import webp from 'webp-converter';



export class WEBPConverterService{

  async imgToWebp({path, outpath, quality, logging}:{path:string,outpath:string,quality:number, logging?: boolean}){
    return new Promise((resolve , reject)=>{
      try {
        const stauts = webp.cwebp(path, outpath, `-q ${quality} ${logging ? 'logging = "-v"':""}`);
        resolve(stauts);
      } catch (error) {
        reject(error);
      }
    })

  }

  async base64ToWebp(){

  }

  async bufferToWebp(){

  }

  async gifTowebp(){}
}