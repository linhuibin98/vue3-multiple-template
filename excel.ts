import Excel from 'exceljs'

let filename1 = 'test.xlsx';
let filename2 = 'output.xlsx';
let workbook = new Excel.Workbook();

workbook.xlsx.readFile(filename1)
    .then(() => {
      const sheet1 = workbook.getWorksheet('Sheet1');
      // return workbook.xlsx.writeFile(filename2);
      return sheet1.getColumn(1);
    }).then(async (column) => {
      const count = column.worksheet.rowCount;
      for (let i = 1; i <= count; i++) {
        const cell = column.worksheet.getCell(`A${i}`);
        cell.value = {
          text: cell.text,
          hyperlink: `http://ppbc.iplant.cn/list?keyword=${cell.text}`
        };
      }
  await workbook.xlsx.writeFile(filename2)
  console.log('File is written');
}).catch(err => console.error(err));