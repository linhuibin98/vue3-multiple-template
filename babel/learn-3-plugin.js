const babelParser = require("@babel/parser");
const consolePlugin = require('./plugins/console.plugin');
const { transformFromAstSync } = require('@babel/core');
const fs = require('fs/promises');

async function main() {
    const sourceCode = await fs.readFile('./testSourceCode/test1.js', 'utf-8');

    const ast = babelParser.parse(sourceCode, {
        sourceType: 'unambiguous'
    });

    const { code } = transformFromAstSync(ast, sourceCode, {
        plugins: [consolePlugin],
        filename: './testSourceCode/test1.js'
    });

    console.log(code);
}

main();