const { SourceCode, Linter, ESLint } = require('eslint');

const sourceCode = "var foo = bar";

/**
 * SourceCode
 *  */ 
// const code = new SourceCode(sourceCode);

// console.log(code);

/**
 *  linter.verify
 * @param code {string | SourceCode}
 * 
 * @returns messages {Linter.LintMessage[]}
 ```js
{
    fatal: false,
    ruleId: "semi",
    severity: 2,
    line: 1,
    column: 23,
    message: "Expected a semicolon.",
    fix: {
        range: [1, 15],
        text: ";"
    }
}
 ```
 */
const linter = new Linter();

// code as string
const messages = linter.verify(sourceCode, {
    rules: {
        semi: 2
    }
}, {filename: 'test.js'});

console.log(messages);

/**
 * linter.getSourceCode()
 * 
 * @returns code {SourceCode}
{
    text: string; // 源代码
    ast: AST; // AST树
}
 */
// const lintCode = linter.getSourceCode();

// console.log(lintCode.text);

/**
 * linter.verifyAndFix() 检查并自动修复
 * 
 * @returns code {Linter.FixReport}
 *  
    */
const fixMessage = linter.verifyAndFix(sourceCode, {
    rules: {
        semi: 2
    }
}, {
    filename: 'test.js'
});

console.log('修复后的代码', fixMessage.output);
