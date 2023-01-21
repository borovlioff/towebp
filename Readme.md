
# Image to WEBP

Using



## Run Locally

Clone the project

```bash
  git clone https://github.com/borovlioff/towebp.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the cli

```bash
  node build
```

Select image in dialog window

```bash
  node build/cli
```

Select image by absolute path

```bash
  node build/cli -p home/Downloads/image.jpg
```

>By default, the script will place the new image next to the old one.

Select image and output directory

```bash
  node build/cli -p home/Downloads/image.jpg -op home/image.webp
```

Convert image from folder

```bash
  node build/cli -c home/Downloads/
  node build/cli -c home/Downloads/ -op  home/youdir/ 
```

```
.option('-c , --catalog')
    .option(`-p , --path <string>`, "Enter path to file or dirictory")
    .option(`-op , --out-path <string>`, "Enter out dir")
    .option(`-r , --recurcive`, "recurcive search file in subfolder ")
    .option(`-q , --quality <number>`, "Enter quality 1-100", "80")
    .option(`-l , --logging`);
```

## TODO
- Make server
- Inser script cli in global value
- Review code