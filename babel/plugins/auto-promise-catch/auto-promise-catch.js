// 自动添加catch
function autoPromiseCatch(babel, opts) {
  const { types, template } = babel;
  const { promiseNames = ["$modal"], catchCallback = "console.log(err)" } =
    opts;

  return {
    name: "auto-promise-catch",
    visitor: {
      CallExpression(path) {
        const node = path.node;
        if (node.isNew) {
          return;
        }

        if (
          !(
            types.isMemberExpression(node.callee) &&
            types.isThisExpression(node.callee.object) &&
            types.isIdentifier(node.callee.property) &&
            promiseNames.includes(node.callee.property.name)
          )
        ) {
          return;
        }
        const catchPath = path.findParent((pPath) => {
          return (
            types.isMemberExpression(pPath.node) &&
            types.isIdentifier(pPath.node.property, {
              name: "catch",
            })
          );
        });

        if (catchPath) {
          return;
        }

        const mostOuterThenPath = path.findParent((pPath) => {
          const node = pPath.node;
          return (
            types.isCallExpression(node) &&
            types.isMemberExpression(node.callee) &&
            types.isIdentifier(node.callee.property, { name: "then" }) &&
            !types.isMemberExpression(pPath.parentPath.node)
          );
        });

        const arrowFunctionBody = catchCallback
          ? types.blockStatement([template.ast(catchCallback)])
          : types.identifier("err");

        const callbackFunctionNode = types.arrowFunctionExpression(
          [types.identifier("err")],
          arrowFunctionBody
        );

        const newNode = types.callExpression(
          types.memberExpression(mostOuterThenPath.node, types.identifier("catch")),
          [callbackFunctionNode]
        );

        newNode.isNew = true;

        mostOuterThenPath.replaceWith(newNode);
      },
    },
  };
}

module.exports = autoPromiseCatch;
