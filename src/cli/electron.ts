import { spawn } from 'child_process';
import path from 'path';
import electronPath from 'electron';

// (async () => {
//   try {
//      return await filesSelection();
//   } catch (err) {
//     console.error(err);
//   }
// })();

export async function filesSelection() {
  return new Promise((resolve, reject) => {
    const child = spawn(`${electronPath}`, [path.join(__dirname, 'dialog.js')]);

    let out = '';
    child.stdout.on('data', (data) => out += data);
    child.stderr.on('data', reject);
    child.on('close', (code) => {
      try {
        if (code === 0) {
          return resolve(JSON.parse(out));
        }
        reject(new Error(`child process exited with code ${code}`));
      } catch (err) {
        reject(err);
      }
    });
  });
}