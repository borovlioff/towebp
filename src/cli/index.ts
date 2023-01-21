#!/usr/bin/env node

import { join } from 'path';
import { readdir, stat, } from 'fs/promises';
import { WEBPConvertLocalService } from '../service/WebpConverterLocal.service';
import program from "./cli"
import { accessPath } from '../helper/pathAccess';
import isImage from '../helper/isImage';
import { filesSelection } from './electron';
import { getFileInfo } from '../helper/getFileInfo';
import { checkDir } from '../helper/checkDir';

const ROOT_DIR = join(__dirname, "..", "..");

let def_path = join(ROOT_DIR, 'images');
let def_outpath = join(ROOT_DIR, 'out');


const webpLocal = new WEBPConvertLocalService();

async function start() {
    try {
        program.parse();
        const options = program.opts();
        options.quality = parseFloat(options.quality);
        if(!options.path){
            const files =  await filesSelection() as any[];
            for(const filePath of files){
                const { nameFileExtWEBP, webpPath } = getFileInfo(filePath);
               
                if (options.outPath) {
                    const outpPathWebp = join(options.outPath,nameFileExtWEBP);
                    const status = await webpLocal.convertFile({ path: filePath, outpath: outpPathWebp, quality: options.quality, logging: options.logging });
                    console.log(status);
                    
                } else {
                    const status = await webpLocal.convertFile({ path: filePath, outpath: webpPath, quality: options.quality, logging: options.logging });
                    console.log(status);
                }
            }
        }

        const accessPathtoFile = await accessPath(options.patch);
        if(!accessPathtoFile){
            console.log(`File or folder ${options.path} not defined`);
            return;
        }

        const pathIsImage = isImage(options.path);
        if (!pathIsImage) {
            if (options.path) {
                if(options.recurcive){
                    const path = [];
                    const dirs = await readdir(options.path);
                    for(const dir of dirs){
                        console.log(dir);
                        console.log( (await stat(join(options.path ,dir))).isDirectory() )
                    }
                    return;
                }
                if (options.outPath) {
                    const status = await webpLocal.convertFromDir({ path: options.path, outpath: options.outPath, quality: options.quality, logging: options.logging });
                    console.log(status);
                } else {
                    const status = await webpLocal.convertFromDir({ path: options.path, outpath: options.path, quality: options.quality, logging: options.logging });
                    console.log(status);
                }
            } else {
                await checkDir(def_path);
                await checkDir(def_outpath);
                const status = await webpLocal.convertFromDir({ path: def_path, outpath: def_outpath, quality: options.quality, logging: options.logging });
                console.log(status);
            }
            return;
        }
        if (options.path) {
            const { nameFileExtWEBP, webpPath } = getFileInfo(options.path)
            if (options.outPath) {
                const status = await webpLocal.convertFile({ path: options.path, outpath: options.outPath, quality: options.quality, logging: options.logging });
                console.log(status);
            } else {
                const status = await webpLocal.convertFile({ path: options.path, outpath: webpPath, quality: options.quality, logging: options.logging });
                console.log(status);
            }
    
        } else {
            console.log("Enter path");
        }
    } catch (error) {
        console.error(error)
    }
    
    



}

start();