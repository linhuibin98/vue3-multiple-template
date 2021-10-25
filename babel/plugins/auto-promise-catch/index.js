const babelParser = require("@babel/parser");
const autoPromiseCatch = require('./auto-promise-catch');
const { transformFromAstSync } = require('@babel/core');
const fs = require('fs/promises');

async function main() {
    const sourceCode = await fs.readFile('./source-code.js', 'utf-8');

    const ast = babelParser.parse(sourceCode, {
        sourceType: 'unambiguous'
    });

    const { code } = transformFromAstSync(ast, sourceCode, {
        plugins: [autoPromiseCatch],
        filename: './source-code.js'
    });

    console.log(code);
}

main();