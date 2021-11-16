const fs = require('fs/promises');
const cheerio = require('cheerio').default;

async function main() {
    const $ = cheerio.load(await fs.readFile('./index.html', 'utf-8'));
    const keys = ['一线城市', '新一线城市', '二线城市', '三线城市', '四线城市', '五线城市'];
    const result = {};
    $('ol.custom_num.para-list.list-paddingleft-1').each(function(i, el) {
        result[keys[i]] = [];
        const $lis = $(el).find('li.list-num-paddingleft-1');
        $lis.map((ind, elLi) => $(elLi).text()).toArray().forEach(item => {
            item = item.split('：');
            const pro = item[0];
            const city = item[1] || item[0];
            const findF = result[keys[i]].find(f => f[0] === pro);
            if (findF) {
                findF[1].push(city);
            } else {
                result[keys[i]].push([pro, [city]]);
            }
        });
    });
    await fs.writeFile('result.json', JSON.stringify(result), 'utf-8');
}

main();