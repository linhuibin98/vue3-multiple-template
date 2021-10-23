const babelParser = require("@babel/parser");
const babelTypes = require("@babel/types");
const babelGenerator = require("@babel/generator").default;
const babelTraverse = require("@babel/traverse").default;

const testCode = `
console.log(1);
function func() {
    console.info(2);
}

export default class People {
    say() {
        console.debug(3);
    }
    render() {
        return <div>{console.error(4)}</div>
    }
}
`;

const ast = babelParser.parse(testCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});

babelTraverse(ast, {
    CallExpression(currPath) {
        if (currPath.node.callee.object.name === 'console' && ['log', 'info', 'debug', 'error'].includes(currPath.node.callee.property.name)) {
            const { line, column } = currPath.node.loc.start;
            currPath.node.arguments.unshift(babelTypes.stringLiteral(`line: ${line}, column: ${column}`));
        }
    }
});

const { code, map } = babelGenerator(ast);

console.log(code);