module.exports = function (babel) {
  const { template } = babel;

  return {
    name: "console-plugin",
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const callName = path.get("callee").toString();
        if (
          [
            "console.log",
            "console.info",
            "console.debug",
            "console.error",
          ].includes(callName)
        ) {
          // 在原有的 console前面插入一个 console 输出行号和列号
          const { line, column } = path.node.loc.start;
          const newNode = template.expression(
            `console.log("${
              state.file.opts.filename || "unkown filename"
            }: (${line}, ${column})")`
          )();
          newNode.isNew = true;
          path.insertBefore(newNode);
          path.skip();
        }
      },
    },
  };
};
