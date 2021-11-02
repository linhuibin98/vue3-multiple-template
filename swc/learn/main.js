const fs = require('fs/promises');
const swc = require('@swc/core');

async function main() {
    const ast = await swc.parseFile('./source-code.js')
    await fs.writeFile('bundle.json', JSON.stringify(ast), 'utf-8');
}

main();
