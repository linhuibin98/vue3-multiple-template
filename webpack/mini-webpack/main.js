const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const filename = "source-code.js";

// 第一步:转换代码、 生成依赖
function stepOne(filename) {
  // 读取文件内容
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module", // babel官方规定必须加这个参数，不然无法识别ES Module
  });

  // 保存依赖
  const dependencies = {};

  // 遍历 AST 抽象语法树
  traverse(ast, {
    //获取通过import引入的模块
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      const newFile = "./" + path.join(dirname, node.source.value);
      //保存所依赖的模块
      dependencies[node.source.value] = newFile;
    },
  });

  //通过@babel/core和@babel/preset-env进行代码的转换
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    filename, //该文件名
    dependencies, //该文件所依赖的模块集合(键值对存储)
    code, //转换后的代码
  };
}

// 第二步：生成依赖图谱。

//entry为入口文件
function stepTwo(entry) {
    const entryModule = stepOne(entry);
    
}


