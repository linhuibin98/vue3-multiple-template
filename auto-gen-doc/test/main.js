const fs = require("fs/promises");

const babelParser = require("@babel/parser");
const babelTypes = require("@babel/types");
const vueCompilerSFC = require("@vue/compiler-sfc");
const babelTraverse = require("@babel/traverse").default;

// function parseTitle(path) {
//   return ``;
// }

const md = {
  title: '',
  description: '',
  props: [
    {
      name: '',
      description: ''
    }
  ]
};

async function main() {
  const text = await fs.readFile("./ex.vue", "utf-8");
  const sfcParseContent = vueCompilerSFC.parse(text);
  if (sfcParseContent.errors.length) {
    console.log("vueCompilerSFC：解析出错", sfcParseContent.errors[0]);
    return;
  }
  const babelParserAst = babelParser.parse(
    sfcParseContent.descriptor?.script?.content || "",
    {
      sourceType: "module",
    }
  );

  babelTraverse(babelParserAst, {
    ObjectProperty(path) {
      if (Array.isArray(path.container)) {
        path.container.forEach((node) => {
          if (node.key.name === 'name' && node.value.type === 'StringLiteral') {
            md.title = node.value.value;
          }
          if (node.key.name === 'props') {
            // console.log(node);
          }
        });
      } else {
        // console.log(path.container);
      }
    }
  });
}

main();
