const Excel = require("exceljs");

function formatExcel() {
  const workbook = new Excel.Workbook();

  workbook.xlsx.readFile("H:/t8.xlsx").then(() => {
    const workSheet = workbook.getWorksheet("Sheet4");
    const newBook = new Excel.Workbook();
    const newSheet = newBook.addWorksheet("Sheet1");
    let pos = 1;
    workSheet.getSheetValues().forEach((row, index) => {
      if (!!row) {
        newSheet.insertRow(
          pos,
          row.filter((cell) => !!cell)
        );
        pos += 1;
      }
    });
    newBook.xlsx.writeFile("format.xlsx");
  });
}

function dupl() {
  const workbook = new Excel.Workbook();
  const result = new Map();
  workbook.xlsx.readFile("H:/t8.xlsx").then(() => {
    const workSheet = workbook.getWorksheet("Sheet4");
    workSheet.getSheetValues().forEach((row, index) => {
      if (!!row) {
        const key = row[1].trim() + "," + row[2].trim();
        if (!result.has(key)) {
          result.set(key, 1);
        } else {
          const count = result.get(key);
          result.set(key, count + 1);
        }
      }
    });
    const result2 = [];
    result.forEach((val, key) => {
        if (val > 1) {
            result2.push(key+','+val);
        }
    });
    console.log(result2);
  });
}

dupl();
