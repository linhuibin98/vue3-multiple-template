const fs = require('fs');

const package = require('../package.json');
const dependencies = package.dependencies;
dependencies.vue = '3.0.5';
dependencies['vue-router'] = '4.0.4';

fs.writeFileSync('./package.json', JSON.stringify(package, null, 4));
