const fs = require("fs/promises");

const ejs = require("ejs");

async function main() {
  const template = await fs.readFile("./target.md", "utf-8");
  const resStr = ejs.render(template, {
    title: "Ejs 测试",
    description: "我是一个描述",
    props: [
      {
        name: "name",
        description: "名字",
        type: 'String',
        required: false,
        default: 'Hi'
      },
      {
        name: "age",
        description: "年龄",
        type: 'Number',
        required: false,
        default: 18
      },
    ],
  });

  await fs.writeFile('ejs.md', resStr, {
      encoding: 'utf-8'
  })
}

main();
