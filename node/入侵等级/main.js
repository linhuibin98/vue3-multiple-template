const Excel = require("exceljs");
const axios = require("axios").default;
const cheerio = require("cheerio");
const UserAgent = require("user-agents");
const randomIp = require("chinese-random-ip");

function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function genFetchUrl(key) {
  return `http://plantplus.cn/ias/protlist?key=${encodeURIComponent(key)}`;
}

function parseHtmlReturnLevel(html) {
  const $ = cheerio.load(html);
  const data =
    $("table.table1 tr:nth-child(2) td.td2").map((i, el) => $(el).text()) || [];
  // index 4 为 入侵等级
  return data[4] || "";
}

function fetchData(key) {
  return axios
    .get(genFetchUrl(key), {
      headers: {
        Referer: "http://plantplus.cn/",
        "User-Agent": new UserAgent().toString(),
        "X-Forwarded-For": randomIp.getChineseIp(),
      },
    })
    .then((resp) => {
      if (!/20\d/.test(resp.status)) {
        console.log(`${key}: 请求出错了`);
        return;
      }
      return resp.data;
    })
    .catch((e) => {
      console.log(`${key}: 请求出错了`);
      console.error(e);
    });
}

async function readExcel() {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile("./test.xlsx");
  const workSheet = workbook.getWorksheet("Sheet1");
  return {
    workbook,
    workSheet,
  };
}

// run
async function run({ workbook, workSheet }) {
  const len = workSheet.rowCount;
  for (let index = 1; index <= len; index++) {
    const row = workSheet.getRow(index);
    const nameCell = row.getCell(1);
    const workCell = row.getCell(7);
    if (index === 1 || workCell.value) {
      continue;
    }
    await sleep();
    const html = await fetchData(nameCell.value.trim());
    if (!html) {
        continue;
    }
    const level = parseHtmlReturnLevel(html);
    if (!level) {
        console.log(`${nameCell.value}: 无入侵等级`);
        continue;
    }
    workCell.value = level;
    await workbook.xlsx.writeFile("output.xlsx");
    console.log(`${nameCell.value} 获取成功: ${level}`);
  }
}

async function bootstrap() {
  const { workbook, workSheet } = await readExcel();
  await run({ workbook, workSheet });
}

bootstrap();
