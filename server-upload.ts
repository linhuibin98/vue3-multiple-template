import http from 'http'
import path from "path";
import fse from 'fs-extra'
import multiparty from 'multiparty'

const PORT = 3000   // 服务端口
const UPLOAD_DIR = path.resolve(__dirname, '.', 'target') // 大文件存储目录

const resolvePost = (req: any) =>
    new Promise(resolve => {
      let chunk = "";
      req.on("data", (data: any) => {
        chunk += data;
      });
      req.on("end", () => {
        resolve(JSON.parse(chunk));
      });
    });

const pipeStream = (path: string, writeStream: any) =>
    new Promise((resolve: any) => {
      console.log(1, path)
      const readStream = fse.createReadStream(path);
      readStream.on("end", () => {
        console.log(2)
        fse.unlinkSync(path);
        console.log(3)
        resolve();
      });
      console.log(4)
      readStream.pipe(writeStream);
      console.log(5)
    });

// 合并切片
const mergeFileChunk = async (filePath: string, filename: string, size: number) => {
  const chunkDir = path.resolve(UPLOAD_DIR, filename);
  const chunkPaths = await fse.readdir(chunkDir);

  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  // @ts-ignore
  chunkPaths.sort((a, b) => a.split("@@")[1] - b.split("@@")[1]);
  console.log('sort-chunkPaths', chunkPaths)
  await Promise.all(
      chunkPaths.map((chunkPath, index) =>
          pipeStream(
              path.resolve(chunkDir, chunkPath),
              // 指定位置创建可写流
              fse.createWriteStream(filePath, {
                start: index * size,
                // @ts-ignore
                end: (index + 1) * size
              })
          )
      )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

const server = http.createServer()

server.on('request', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  console.log('headers', req.url)
  if (req.url === '/upload') {
    // 接收切片
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('fields=================')
      console.log(fields)

      console.log('files=================')
      console.log(files)
      const [chunk] = files.chunk
      const [hash] = fields.hash
      const [filename] = fields.filename;
      const chunkDir = path.resolve(UPLOAD_DIR, filename);

      // 切片目录不存在，创建切片目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }

      // fs-extra 专用方法，类似 fs.rename 并且跨平台
      // fs-extra 的 rename 方法 windows 平台会有权限问题
      await fse.move(chunk.path, `${chunkDir}/${hash}`);
      res.end("received file chunk");
    })
  }
  if (req.url === '/merge') {
    const data: any = await resolvePost(req);
    const { filename,size } = data;
    const filePath = path.resolve(UPLOAD_DIR, `file-${filename}`);
    await mergeFileChunk(filePath, filename, size);

    res.end("merge file chunk");
  }
})

server.listen(PORT, () => console.log('正在监听 3000 端口'))