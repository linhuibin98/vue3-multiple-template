import cheerio from 'cheerio';

const html = "<div style='padding-left:0px'>被子植物门 Angiospermae</div><div style='padding-left:10px'>双子叶植物纲 Dicotyledoneae</div><div style='padding-left:20px'>原始花被亚纲 Archichlamydeae</div><div style='padding-left:30px'><a href='/info/Malvales?t=z'>锦葵目 Malvales</a></div><div style='padding-left:40px'><a href='/info/Tiliaceae?t=z'>椴树科 Tiliaceae</a></div><div style='padding-left:50px'><a href='/info/Subfam. Tilioideae?t=z'>椴树亚科 Subfam. Tilioideae</a></div><div style='padding-left:60px'><a href='/info/Trib. Triumfetteae?t=z'>刺蒴麻族 Trib. Triumfetteae</a></div><div style='padding-left:70px'><a href='/info/Triumfetta?t=z'>刺蒴麻属 Triumfetta</a></div>";

function parseInfo(html: string) {
    const reuslt: any = {};
    const $ = cheerio.load(html);

    Array.from($('a')).forEach(aEl => {
        const $aEL = $(aEl);
        if (/\/info\/.+/.test(($aEL.attr('href') || '')) && ($aEL.text() || '').includes('科') && !($aEL.text() || '').includes('亚科')) {
            const text = $aEL.text().split(' ');
            reuslt.famctxt = text[0] || '';
            reuslt.faml = text.slice(1, text.length).join('');
        }
        if (/\/info\/.+/.test(($aEL.attr('href') || '')) && ($aEL.text() || '').includes('属') && !($aEL.text() || '').includes('亚属')) {
            const text = $aEL.text().split(' ');
            reuslt.genctxt = text[0] || '';
            reuslt.genl = text.slice(1, text.length).join('');
        }
    });

    return reuslt;
}

console.log(parseInfo(html));

