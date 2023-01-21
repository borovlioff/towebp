import { access } from "fs/promises";

export async function accessPath(path){
    return await access(path).then(()=>{ return true}).catch(()=>{ return null });
}