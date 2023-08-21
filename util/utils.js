"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFixedDigits = void 0;
/**
 * 保留小数点后指定位数
 *
 * @param {number|string} num - 原始数值
 * @param {object} options - 配置项
 * @param {number} [options.keep=2] - 保留几位小数
 * @param {boolean} [options.padZero] - 小数不足时是否补0,返回值时string时没办法补0
 * @param {'string'|'number'} [options.returnType='string'] - 返回值类型
 * @returns {string|number} 处理后的值
 */
function toFixedDigits(num, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decimals, decimals = _a === void 0 ? 2 : _a, _b = options.returnType, returnType = _b === void 0 ? "string" : _b, _c = options.padZero, padZero = _c === void 0 ? false : _c;
    var tem = Number(num);
    if (isNaN(tem)) {
        return returnType == "string" ? "0" : 0;
    }
    var result = typeof num === "string" ? parseFloat(num) : num;
    var power = Math.pow(10, decimals);
    var formatted = Math.round(result * power) / power;
    // 判断是否需要补0
    if (padZero) {
        formatted = formatted.toFixed(decimals);
    }
    if (returnType == "string") {
        return formatted;
    }
    else {
        return Number(formatted);
    }
}
exports.toFixedDigits = toFixedDigits;
//# sourceMappingURL=utils.js.map