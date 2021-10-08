import Excel from "exceljs";
import axios from "axios";

axios.defaults.timeout = 20000;

let filename1 = "test.xlsx";
let filename2 = "output.xlsx";
let workbook = new Excel.Workbook();

function delay(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function nameLink(filePath: string, outputPath = "output.xlsx") {
  workbook.xlsx
    .readFile(filePath)
    .then(() => {
      const sheet1 = workbook.getWorksheet("Sheet1");
      // return workbook.xlsx.writeFile(outputPath);
      return sheet1.getColumn(1);
    })
    .then(async (column) => {
      const count = column.worksheet.rowCount;
      for (let i = 1; i <= count; i++) {
        const cell = column.worksheet.getCell(`A${i}`);
        cell.value = {
          text: cell.text,
          hyperlink: `http://ppbc.iplant.cn/list?keyword=${cell.text}`,
        };
      }
      await workbook.xlsx.writeFile(outputPath);
      console.log("File is written");
    })
    .catch((err) => console.error(err));
}

function findInfoByName(filePath: string, outputPath = "output.xlsx") {

  workbook.xlsx
    .readFile(filePath)
    .then(() => workbook.getWorksheet("总名录"))
    .then(async (NameSheet) => {
      const count = NameSheet.rowCount;
      for (let i = 34; i <= count; i++) {
        const cell = NameSheet.getCell(`A${i}`);
        console.log(`当前进度：${i}/${count - 1}`);
        console.log(`种名：${cell.text}`);
        let htmlResponse: any;
        try {
          htmlResponse = await axios.get(`http://plantplus.cn/info/${encodeURIComponent(cell.text)}`);
        } catch {
          continue;
        }
        if (htmlResponse?.status === 200) {
          const match = ((htmlResponse?.data || "") as string).match(/var spno = "(\d+)"/);
          const id = match?.[1];
          if (id) {
            const lmatch = ((htmlResponse?.data || "") as string).match(/var latin2 = '(.+)'/);
            const lname = lmatch?.[1] || '';

            let infoRes: any;

            if (lname) {
              try {
                infoRes = await axios.get(`http://www.iplant.cn/ashx/getfrps.ashx?key=${lname}&m=${Math.random()}`);
              } catch {
                //
              }
            }

            if (infoRes?.status === 200) {
              const xlname = infoRes?.data?.frpsl || '';
              // 拉丁学名
              const lcell = NameSheet.getCell(`C${i}`);
              lcell && (lcell.value = xlname);
              console.log(`拉丁学名：${xlname}`);
            }

            let classifyRes: any;
            try {
              classifyRes = await axios.get(`http://www.iplant.cn/ashx/getclasssys.ashx?spid=${id}`);
            } catch {
              //
            }
            if (classifyRes?.status === 200) {
              const classData = classifyRes.data as any;
              // 科名
              const kcell = NameSheet.getCell(`D${i}`);
              kcell && (kcell.value = classData.famctxt);
              console.log(`科名：${classData.famctxt}`);
              // 科拉丁名
              const klcell = NameSheet.getCell(`E${i}`);
              klcell && (klcell.value = classData.faml);
              console.log(`科拉丁名：${classData.faml}`);
              // 属名
              const scell = NameSheet.getCell(`F${i}`);
              scell && (scell.value = classData.genctxt);
              console.log(`属名：${classData.genctxt}`);
              // 属拉丁名
              const slcell = NameSheet.getCell(`G${i}`);
              slcell && (slcell.value = classData.genl);
              console.log(`属拉丁名：${classData.genl}`);
            }

            await workbook.xlsx.writeFile(outputPath);
          }
        }
      }
      console.log("File is written");
    })
    .catch((err) => console.error(err));
}

findInfoByName(filename1, filename2);