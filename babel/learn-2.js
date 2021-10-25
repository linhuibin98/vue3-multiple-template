const babelParser = require("@babel/parser");
const babelTypes = require("@babel/types");
const babelGenerator = require("@babel/generator").default;
const babelTraverse = require("@babel/traverse").default;
const babelTemplate = require("@babel/template").default;

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

const testCode2 = `
console.log(1);
function func() {
    console.info(2);
}
`;

const ast = babelParser.parse(testCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

babelTraverse(ast, {
  CallExpression(currPath, state) {
    if (currPath.node.isNew) {
      return;
    }
    // callee toString 可以转换为 console.log 。。。
    const callName = currPath.get("callee").toString();
    if (
      [
        "console.log",
        "console.info",
        "console.debug",
        "console.error",
      ].includes(callName)
    ) {
      // 在原有的 console前面插入一个 console 输出行号和列号
      const { line, column } = currPath.node.loc.start;

      const newNode = babelTemplate.expression(
        `console.log("filename: (${line}, ${column})")`
      )();
      newNode.isNew = true;
      if (currPath.findParent((pt) => pt.isJSXElement())) {
        currPath.replaceWith(
          babelTypes.arrayExpression([newNode, currPath.node])
        );
      } else {
        currPath.insertBefore(newNode);
      }

      currPath.skip();
    }
  },
});

const { code, map } = babelGenerator(ast);

console.log(code);
