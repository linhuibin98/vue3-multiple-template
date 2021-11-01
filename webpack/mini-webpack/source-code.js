import module1 from './test-module1.js';
import module2 from './test-module2.js';

function executeModule(path) {
    module1();
    module2();
}

function add(a, b) {
    return a + b;
}

console.log('add', add(1, 2));
executeModule();