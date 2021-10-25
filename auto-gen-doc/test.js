const fs = require('fs/promises');

const babelParser = require('@babel/parser');
const vueCompilerSFC = require('@vue/compiler-sfc');

fs.readFile('./test/ex.vue', 'utf-8').then(text => {
    const sfcParseContent = vueCompilerSFC.parse(text);
    if (sfcParseContent.errors.length) {
        console.log('vueCompilerSFC：解析出错', sfcParseContent.errors[0]);
        return;
    }
    // console.log(sfcParseContent.descriptor.script.content)
    const babelParserContent = babelParser.parse(sfcParseContent.descriptor.script.content, {
        sourceType: 'module'
    });
    let propsText = `|  Prop   | Type  |\n|  ----  | ----  |\n`;
    babelParserContent.program.body.forEach(node => {
        if (node.declaration && node.declaration.type === 'ObjectExpression') {
            node.declaration.properties.forEach(n1 => {
                // console.log(n1);
                if (n1.key.name === 'name') {
                    console.log(n1.value.value)
                }
                if (n1.key.name === 'props') {
                    n1.value.properties.forEach((pro, index) => {
                        if (pro.value.type === 'ObjectExpression') {
                            pro.value.properties.forEach(pp => {
                                if (pp.key.name === 'type') {
                                    propsText += `|   ${pro.key.name} | ${pp.value.name}  |\n`;
                                }
                            });
                        } else if (pro.value.type === 'Identifier') {
                            propsText += `|   ${pro.key.name} |   ${pro.value.name}   |\n`;
                        }
                    });
                }
            })
        }
    });
    console.log(propsText);
    return fs.writeFile('readme.md', propsText, {encoding: 'utf8'});
}).catch(e => {
    console.log(e);
});

