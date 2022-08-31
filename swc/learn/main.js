const fs = require('fs/promises')
const swc = require('@swc/core')

async function main() {
  const ast = await swc.parseFile('./source-code.js')
  await fs.writeFile('bundle.json', JSON.stringify(ast), 'utf-8')
  const { code } = await swc.transform(ast, {
    filename: 'source-code.js',
    env: {
      targets: 'Android >= 6, iOS >= 10, ie >= 11, Firefox >= 35, chrome >= 40',
      mode: 'usage',
      coreJs: '3.22',
    },
  })
  await fs.writeFile('bundle.js', code, 'utf-8')
}

main()
