/**
 * 计算url中的参数值
 * @param url
 * @param name 参数key
 * @returns {string|null} 参数value
 */
function getParamByUrl(url, name) {
  // let reg = new RegExp(`[?&]${name}=[_a-zA-Z0-9%.-]*&?`)
  let reg = new RegExp(`[?&]${name}=[^#&]*&?`)
  let match = url.match(reg);
  if (match) {
    return match[0].split("=")[1].replaceAll("&", "")
  } else {
    return null
  }
}

//保留两位小数
function keepTwoDecimalFull(num) {
  let result = parseFloat(num);
  if (isNaN(result)) {
    return "";
    // throw new Error('传递参数错误，请检查！')
  }
  result = Math.round(num * 100) / 100;
  let s_x = result.toString(); //将数字转换为字符串

  let pos_decimal = s_x.indexOf('.'); //小数点的索引值
// 当整数时，pos_decimal=-1 自动补0
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }

// 当数字的长度< 小数点索引+2时，补0
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}

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
function toFixedDigits(num, options = {}) {
  const {decimals = 2, returnType = "string", padZero = false} = options;
  const tem = Number(num);
  if (isNaN(tem)) {
    return returnType == "string" ? "0" : 0;
  }
  let result = typeof num === "string" ? parseFloat(num) : num;

  const power = Math.pow(10, decimals);
  let formatted = Math.round(result * power) / power;

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

//去除字符串前后以及中间可能出现的空格
function removeWhiteSpace(str) {
  return str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '');
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

// 日期格式化
function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      let originalTime = time
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
      let tempDate = new Date(time)
      if (!isValidDate(tempDate)) {
        time = new Date(originalTime).getTime() + 8 * 3600 * 1000
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 构造分页数据
 * @param page 当前页码
 * @param total 总页码
 * @param show 当前页码前后最多显示的页码的数量
 * @returns {string} ,分割的字符串
 */
function showPages(page, total, show) {
  var str = '';
  if (total <= show * 2 + 1) {
    for (var i = 1; i <= total; i++) {
      str = str + "," + i;
    }
    return str.trim().substr(1)
  }
  if (page < show + 1) {
    for (var i = 1; i <= show * 2 + 1; i++) {
      str = str + ',' + i;
    }
  } else if (page > total - show) {
    for (var i = total - show * 2; i <= total; i++) {
      str = str + ',' + i;
    }
  } else {
    for (var i = page - show; i <= page + show; i++) {
      str = str + ',' + i;
    }
  }
  return str.substr(1).trim();
}

/**
 * 判断是否为空
 * @param value 任何值
 * @param includeZero {boolean} 默认值false，0会被认为是真值
 * @returns {boolean} 为空则为true
 */
function isEmpty(value, includeZero = false) {
  if (value == null) return true;
  if (typeof value === 'boolean') return value;

  if (typeof value === 'number') {
    if (!includeZero) {
      if (value === 0) {
        return false
      }
    }
    return !value;
  }

  if (value instanceof Error) return true;

  switch (Object.prototype.toString.call(value)) {
    //string
    case '[object String]':
      if ('undefined' === value.toLowerCase()) return true;
      if ('nan' === value.toLowerCase()) return true;
      return !value.length;
    //array
    case '[object Array]':
      return !value.length;

    //Map or Set or File
    case '[object File]':
    case ['object Map']:
    case '[object Set]':
      return !value.size
    case ['object object']:
      return !Object.keys(value).length
  }

}

/**
 *
 * @param {Array} list  原始扁平数组
 * @param {String} cIdName 代表孩子节点的属性名称
 * @param {String} pIdName 代表父节点的属性名称
 * @param {String} treeFieldName 返回的树形数据的子节点的属性名称
 * @param  rootPidValue 代表根节点的属性值
 * @returns res JSON树形机构数组
 */
function convertPlatListToTreeData(list, cIdName, pIdName, treeFieldName, rootPidValue = null) {
  const res = [];
  //(res[v[cIdName]] = v, res),这段代码用了逗号操作符，即（对它的每个操作数求值（从左到右），并返回最后一个操作数的值），剩余的就是reduce的常规操作
  const map = list.reduce((res, v) => (res[v[cIdName]] = v, res), {});
  for (const item of list) {
    if (item[pIdName] === rootPidValue) {
      res.push(item);
      continue;
    }//这一的目的是计算出父级元素
    //in 操作符 检测属性是否在对象中
    if (item[pIdName] in map) {//找到item的父元素
      const parent = map[item[pIdName]];//map里的对象和res里的是同一个对象
      parent[treeFieldName] = parent[treeFieldName] || [];//父元素里添加子元素这里只是容错，因为刚开始没有这个字段,这时候则赋值为空数组
      parent[treeFieldName].push(item);
    }
  }
  return res;
}

function flatten(data) {
  //{id, title, pid, children = []}，这段代码利用了对象的展开语法
  return data.reduce((arr, {children = [], ...args}) =>
    arr.concat([{...args}], flatten(children)), []);
}

/**
 * 把开始时间和结束时间转换成如下格式的数据
 * {
 *   "2023/12/21":[{"data":data,"range":[12:12,24:00]}],
 *   2023/12/22":[{"data":data,"range":[00:00,10:02]}]
 * }
 * @param startTimes 2023-12-21 12:12:12
 * @param endTimes 2023-12-22 10:02:12
 * @param data 额外的数据
 */
function convertToTimeArray(startTimes, endTimes, data) {
  const result = {};

  // 将字符串形式的日期转换为 Date 对象
  const startDate = new Date(startTimes);
  const endDate = new Date(endTimes);

  // 循环遍历开始日期到结束日期之间的每一天
  while (startDate <= endDate) {
    console.log(startDate.toLocaleDateString())
    const currentDate = startDate.toLocaleDateString().split('/')
      .map((part) => part.padStart(2, '0')) // 确保月份和日期是两位数
      .join('/'); // 获取当前日期的字符串形式

    // 如果当前日期不在结果中，添加该日期
    if (!result[currentDate]) {
      result[currentDate] = [];

    }

    // 计算当前日期的时间段
    const startTime = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
    const endTime =
      startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth()
        ? endDate.getHours().toString().padStart(2, '0') + ':' + endDate.getMinutes().toString().padStart(2, '0')
        : '24:00';

    // 添加时间段到当前日期
    if (startTime !== endTime) {
      result[currentDate][0] = {}
      result[currentDate][0]['range'] = [startTime, endTime];
      result[currentDate][0]['data'] = data;
    } else {
      delete result[currentDate]
    }


    // 将日期增加一天
    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0, 0, 0, 0);
  }

  return result;
}

// 示例用法
const startTimes = "2023-12-29 02:00:00";
const endTimes = "2024-01-02 00:00:00";
const result = convertToTimeArray(startTimes, endTimes, 12);
console.log(result);




