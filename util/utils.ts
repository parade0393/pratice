type KeepOptions = {
  decimals?: number;
  returnType?: "string" | "number";
  padZero?: boolean;
};
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
export function toFixedDigits(num: number | string, options: KeepOptions = {}) {
  const { decimals = 2, returnType = "string", padZero = false } = options;
  const tem = Number(num);
  if (isNaN(tem)) {
    return returnType == "string" ? "0" : 0;
  }
  let result = typeof num === "string" ? parseFloat(num) : num;

  const power = Math.pow(10, decimals);
  let formatted: string | number = Math.round(result * power) / power;

  // 判断是否需要补0
  if (padZero) {
    formatted = formatted.toFixed(decimals);
  }

  if (returnType == "string") {
    return formatted;
  } else {
    return Number(formatted);
  }
}

