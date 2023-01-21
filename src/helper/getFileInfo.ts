import { basename, dirname, extname, join } from "path";

export function getFileInfo(path) {
    const ext = extname(path);
    const patchToFile = dirname(path);
    const basenameFile = basename(path);
    const nameFileExtWEBP = `${basenameFile.replace(ext, "")}.webp`;
    const webpPath = `${join(patchToFile, nameFileExtWEBP)}`;
    return {
        nameFileExtWEBP,
        patchToFile,
        webpPath
    }
}