const Excel = require("exceljs");
const { log, e } = require("mathjs");
const { str1, str2, str3, str4, str5 } = require("./data2");

function formatData(str1) {
  let str1Arr = str1.split("\n");
  str1Arr = str1Arr.slice(1, str1Arr.length - 1);

  return str1Arr.map((item) => item.split(" ").filter((item) => !!item));
}

function formatDataResult(dataArr) {
  const result = [];
  for (let i = 0; i < dataArr.length; i++) {
    let tempArr = [];
    dataArr[i].forEach((item, index) => {
      if (index % 2 !== 0) {
        tempArr = tempArr.concat(item);
      }
    });
    result.push(tempArr);
  }
  let tempArr = [];
  dataArr[1].forEach((item, index) => {
    if (index % 2 === 0) {
      tempArr = tempArr.concat(item);
    }
  });
  result.unshift(tempArr);
  return result;
}

async function writeSheet(data, workbook, sheetName) {
  const worksheet = workbook.addWorksheet(sheetName);
  for (let i = 0; i < data.length; i++) {
    const row = worksheet.getRow(i + 1);
    for (j = 0; j < data[i].length; j++) {
      row.getCell(j + 1).value = data[i][j];
    }
  }
}
const sheetNames = [
  "Shannon-Wiener指数",
  "Simpson指数",
  "Inverse Simpson指数",
  "物种累计数",
  "Pielou均匀度指数",
];
async function writeXlsx(data, output = "output.xlsx") {
  const workbook = new Excel.Workbook();

  for (let i = 0; i < data.length; i++) {
    await writeSheet(data[i], workbook, sheetNames[i]);
  }

  await workbook.xlsx.writeFile(output);
}

async function writeXlsxColumn(data) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  for (let i = 0; i < data.length; i++) {
    const col = worksheet.getColumn(i + 1);
    col.values = data[i];
  }
  const richnessData = await compRichness();
  worksheet.getSheetValues().forEach((row, index) => {
    if (!!row) {
      const [_, plot, c1, c2, c3, typeNum, c4] = row;
      const key = plot.trim();
      if (richnessData.has(key)) {
        const num = richnessData.get(key);
        const richness = (typeNum - 1) / log(num, e);
        worksheet.spliceRows(index, 1, [...(row.filter(cell => cell)), richness]);
      }
    }
  });

  await workbook.xlsx.writeFile("output.xlsx");
}
// writeXlsx([str1, str2, str3, str4, str5].map(item => formatData(item)));
writeXlsxColumn(
  formatDataResult(
    [str1, str2, str3, str4, str5].map((item) => formatData(item))
  )
);

// 计算丰富度
function compRichness() {
  const workbook = new Excel.Workbook();

  return workbook.xlsx.readFile("H:/t10.xlsx").then(() => {
    const workSheet = workbook.getWorksheet("Sheet4");
    const allData = new Map();
    workSheet.getSheetValues().forEach((row, index) => {
      if (!!row) {
        const [_, plot, name, num] = row;
        const key = plot.trim();
        if (key === 'plotname') {
          return;
        }
        if (!allData.has(key)) {
          allData.set(key, num);
        } else {
          const count = allData.get(key);
          allData.set(key, num + count);
        }
      }
    });

    return allData;
  });
}
