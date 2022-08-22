import { join, basename, extname } from 'path';
import { access, readdir, mkdir, } from 'fs/promises';
import { WebpConvertService } from "../service/WebpConverService";
const { program } = require('commander');

const ROOT_DIR = join(__dirname,"..","..");
console.log(ROOT_DIR);

let def_path = join(ROOT_DIR, 'images');
let def_outpath = join(ROOT_DIR, 'out');


const cwebp = new WebpConvertService();

async function checkDir(path: string) {
    try {
        await access(path);
    } catch (error) {
        await mkdir(path);
    }
}


async function fromDir(path: string, outpath: string, quality: number) {
    try {
        let listFile = await readdir(path, 'utf8');
        listFile.forEach(file => {
            if (extname(file) == ".png") {
                let name = file.replace(`.png`, ``);
                let pngPath = join(path, `${name}.png`);
                let webpPath = join(outpath, `${name}.webp`);

                cwebp.pngToWebp(pngPath, webpPath, quality);
            }
        });
    } catch (error) {
        console.log(error)
    }
}




program
    .option('-f , --file')
    .option('-c , --catalog')
    .option(`-p , --path <string>`, "Enter path to file or dirictory")
    .option(`-op , --out-path <string>`, "Enter out dir")
    .option(`-q , --quality <number>`, "Enter quality 1-100", 80);



async function start() {
    program.parse();
    const options = program.opts();

    if (options.catalog) {
        if (options.path) {
            if (options.outPath) {
                fromDir(options.path, options.outPath, options.quality);
            } else {
                fromDir(options.path, options.path, options.quality);
            }
        } else {
            await checkDir(def_path);
            await checkDir(def_outpath);
            fromDir(def_path, def_outpath, options.quality);
        }
    } else if (options.file) {
        if (options.path) {
            const ext = extname(options.path);
            if (ext == ".png") {
                const oldname = basename(options.path);
                const name = basename(options.path).replace(".png", ".webp");
                if (options.outPath) {
                    const webpPath = join(options.outPath, name);
                    cwebp.pngToWebp(options.path, webpPath, options.quality);
                } else {
                    const webpPath = options.path.replace(oldname, name);
                    cwebp.pngToWebp(options.path, webpPath, options.quality);
                }
            }
        } else {
            console.log("Enter path");
        }

    } else {
        console.log("Select one params --file or --catalog");
    }

}

start();