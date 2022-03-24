const ni = require('@antfu/ni');

// console.log(ni)

ni.detect({
    autoInstall: false,
    cwd: process.cwd(),
}).then(agent => {
    console.log(agent);
});

ni.run(ni.parseNi, ['vue@latest', 'hello-world']);
