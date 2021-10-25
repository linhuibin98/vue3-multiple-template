const fs = require('fs/promises');
const Excel = require('exceljs');

async function readXlsx(path, sheetName) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet(sheetName);
    return {
        workbook,
        worksheet
    };
}

/**
 * 相对密度、相对显著度
 */
// {
//     plot: {
//         name: {
//             d,
//             abundance
//         },
//            res1,
//            res2,
//            res3,
//     }
// }
async function main() {
    const {workbook, worksheet} = await readXlsx('H:/t11.xlsx', 'Sheet1');
    const result = {};
    worksheet.getSheetValues().forEach((row, index) => {
        if (row && index > 1) {
            const [ _, plot, name, d, abundance ] = row;
            if (!result[plot]) {
                result[plot] = {};
            }
            if (!result[plot][name]) {
                result[plot][name] = {};
            }
            result[plot][name]['d'] = d;
            result[plot][name]['abundance'] = abundance;
        }
    });

    console.log(result)
}

main();