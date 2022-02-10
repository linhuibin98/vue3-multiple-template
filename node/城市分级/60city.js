const Excel = require("exceljs");
const fs = require('fs/promises');

async function excelToJSON() {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./60city.xlsx');
    const workSheet = workbook.getWorksheet("目标城市");
    const citys = [];
    workSheet.getSheetValues().forEach(([$1, $2, $3, city], index) => {
        if (index > 1) {
            citys.push(city);
        }
    });
    console.log(citys);
}

excelToJSON();




