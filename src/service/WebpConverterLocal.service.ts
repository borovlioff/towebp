import isImage from "../helper/isImage";
import { join } from 'path';
import { readdir } from 'fs/promises';
import {WEBPConverterService} from "./WebpConverter.service"


export type WEBPConvert = {path: string, outpath: string, quality: number, logging?:boolean}

export class WEBPConvertLocalService{
    constructor(private _WEBPConverter = new WEBPConverterService()){}

    async convertFromDir({path, outpath, quality, logging}:WEBPConvert){
        const statusAll = [];
        try {
            let listFile = await readdir(path, 'utf8');
            for (const file of listFile){
                if(isImage(file)){
                    const pngPath = join(path, `${file}`);
                    const webpPath = join(outpath, `${file}.webp`);
                    const status = await this._WEBPConverter.imgToWebp({ path: pngPath, outpath: webpPath, quality, logging:logging });
                    statusAll.push(status);
                }
            }
            return statusAll;
        } catch (error) {
            throw new Error(error);
        }
    }

    async convertFile({path, outpath, quality, logging}: WEBPConvert){
        try {
            if(isImage(path)){
            const status = await this._WEBPConverter.imgToWebp({ path, outpath, quality, logging });
            return status;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}