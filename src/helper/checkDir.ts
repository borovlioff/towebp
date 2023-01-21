import { access, mkdir } from "fs/promises";

export async function checkDir(path: string) {
    try {
        await access(path);
    } catch (error) {
        await mkdir(path);
    }
}