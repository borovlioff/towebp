import { app, dialog } from 'electron';

app.on('ready', async () => {
  try {
    const res = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters:[
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      ]
    });
    process.stdout.write(JSON.stringify(res?.filePaths || []));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});