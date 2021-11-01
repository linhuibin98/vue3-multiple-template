
      (function(graph) {
          // require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
          function require(module) {
            //localRequire的本质是拿到依赖包的exports变量
            function localRequire(relativePath) {
              return require(graph[module].dependencies[relativePath]);
            }
            var exports = {};
            (function(require, exports, code) {
                eval(code);
            })(localRequire, exports, graph[module].code);
            // 函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
            return exports;
          }
          require('./source-code.js');
      })({"./source-code.js":{"dependencies":{"./test-module1.js":"./test-module1.js","./test-module2.js":"./test-module2.js"},"code":"\"use strict\";\n\nvar _testModule = _interopRequireDefault(require(\"./test-module1.js\"));\n\nvar _testModule2 = _interopRequireDefault(require(\"./test-module2.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction executeModule(path) {\n  (0, _testModule[\"default\"])();\n  (0, _testModule2[\"default\"])();\n}\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log('add', add(1, 2));\nexecuteModule();"},"./test-module1.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction module1() {\n  console.log('module1');\n}\n\nvar _default = module1;\nexports[\"default\"] = _default;"},"./test-module2.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction module2() {\n  console.log('module2');\n}\n\nvar _default = module2;\nexports[\"default\"] = _default;"}});
   