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
//         name: [{ d, abundance }], name.TotalNum, name.relativeDensity 相对密度, name.relativeView 相对显著度
//         name2, 物种2
//         name3, 物种3
//         allTotal: number, // 全部物种数
//         allBasalArea: number // 总断面积
//     }
//      plot2: {
//          ....
//      }
// }
async function main() {
    const {workbook, worksheet} = await readXlsx('c3.xlsx', 'Sheet1');
    // 初步整理数据
    const result = {};
    worksheet.getSheetValues().forEach((row, index) => {
        if (row && index > 1) {
            let [ _, plot, name, g, abundance ] = row;
            g = parseFloat(String(g).trim());
            if (!result[plot]) {
                result[plot] = {
                    allTotal: 0,
                    allGdu: 0
                };
            }
            if (!result[plot][name]) {
                result[plot][name] = [];
                result[plot][name].TotalNum = 0; // 物种总数量
                result[plot][name].Gdu = 0; // 总截面
                result[plot][name].relativeDensity = 0; // 相对密度
                result[plot][name].relativeGdu = 0; // 相对盖度
            }
            // 数量
            result[plot].allTotal += abundance;
            result[plot][name].TotalNum += abundance;
            // 截面
            result[plot][name].Gdu += g;
            result[plot].allGdu += g;
            //
            result[plot][name].push({
                g,
                abundance
            });
        }
    });
    // 最后输出到表格数据
    const sheetRows = [];
    // 计算 相对密度
    Object.keys(result).forEach(plot => {
        const plotObj = result[plot];
        Object.keys(plotObj).forEach(name => {
            const nameArr = plotObj[name];
            if (Array.isArray(nameArr)) {
                // 相对密度
                nameArr.rawRelativeDensity = nameArr.TotalNum / plotObj.allTotal;
                nameArr.relativeDensity = (nameArr.rawRelativeDensity * 100).toFixed(2) + '%';
                // 相对盖度
                nameArr.rawRelativeGdu = nameArr.Gdu / plotObj.allGdu;
                nameArr.relativeGdu = (nameArr.rawRelativeGdu * 100).toFixed(2) + '%';

                sheetRows.push([plot, name, nameArr.relativeDensity, nameArr.relativeGdu]);
            }
        });
    });
    
    const newBook = new Excel.Workbook();
    const newSheet = newBook.addWorksheet('Sheet1');
    newSheet.addRows(sheetRows);
    await newBook.xlsx.writeFile('output.xlsx');
}

main();