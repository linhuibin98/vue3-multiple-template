/**
 * base64编码
 * Base64要求把每三个8Bit的字节转换为四个6Bit的字节（3*8 = 4*6 = 24）
 * 然后把6Bit再添两位高位0，组成四个8Bit的字节
 */

const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * base64编码
 * @param {string} str 
 * @returns 
 */
function encodeBase64(str) {
    let buf = Buffer.from(str);
    let result = '';
    for (let b of buf) {
        result += b.toString(2);
    }
    console.log('result:', result); // result: 111001111000111110100000
    // result.match(/(\d{6})/g): [ '111001', '111000', '111110', '100000' ]
    return result.match(/(\d{6})/g).map(val => parseInt(val, 2)).map(val => CHARTS[val]).join('');
}
let r = encodeBase64('测试');
console.log(r); // 54+g

function decodeBase64(base64) {

}
