// 自动添加catch
function autoPromiseCatch(babel, opts) {
    const {types, template} = babel;
    const {targetObj = 'this', promiseNames = ['$modal'], catchCallback = 'console.log(err)'} = opts;

    function isTargetObj(node, target) {
        // target 没有目标对象的话，则全部对象上有调用 promiseNames 上的属性，则会 patch catch
        if (!target) {
            return true;
        }
        if (!types.isCallExpression(node)) {
            return false;
        }
        if (target === 'this') {
            return types.isThisExpression(node.callee.object);
        } else {
            return types.isIdentifier(node.callee.object, {name: target});
        }
    }

    return {
        name: 'auto-promise-catch',
        visitor: {
            CallExpression(path) {
                const node = path.node;
                if (node.isNew) {
                    return;
                }
                // filter target  case this.$name(), util.$name(), $name() ...
                if (
                    !(
                        isTargetObj(node, targetObj) &&
                        ((types.isMemberExpression(node.callee) &&
                            types.isIdentifier(node.callee.property) &&
                            promiseNames.includes(node.callee.property.name)) ||
                            (types.isIdentifier(node.callee) && promiseNames.includes(node.callee.name)))
                    )
                ) {
                    return;
                }
                const catchPath = path.findParent(pPath => {
                    const pNode = pPath.node;
                    return (
                        types.isCallExpression(pNode) &&
                        types.isMemberExpression(pNode.callee) &&
                        types.isIdentifier(pNode.callee.property, {
                            name: 'catch'
                        })
                    );
                });

                if (catchPath) {
                    return;
                }
                // 找最外层 then
                const outermostThenPath = path.findParent(pPath => {
                    const node = pPath.node;
                    return (
                        types.isCallExpression(node) &&
                        types.isMemberExpression(node.callee) &&
                        types.isIdentifier(node.callee.property, {name: 'then'}) &&
                        !types.isMemberExpression(pPath.parentPath.node)
                    );
                });
                // 表达式最外层
                const outermostPath = outermostThenPath || path;

                const arrowFunctionBody = catchCallback
                    ? types.blockStatement([template.ast(catchCallback)])
                    : types.identifier('err');

                const callbackFunctionNode = types.arrowFunctionExpression(
                    [types.identifier('err')],
                    arrowFunctionBody
                );

                const newNode = types.callExpression(
                    types.memberExpression(outermostPath.node, types.identifier('catch')),
                    [callbackFunctionNode]
                );

                newNode.isNew = true;

                outermostPath.replaceWith(newNode);
            }
        }
    };
}

module.exports = autoPromiseCatch;
