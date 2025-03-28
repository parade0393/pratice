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
 * @param includeZero {boolean} 默认值false，默认0会被认为是真值
 * @returns {boolean} 为空则为true []:true {}:true Map() true Set() true
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
  let vv = Object.prototype.toString.call(value)
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
    case '[object Map]':
    case '[object Set]':
      return !value.size
    case ['object object']:
      return !Object.keys(value).length
    case '[object Object]':
      return !Object.keys(value).length
  }

}

/**
 * 判断是否为真，默认0为真
 * @param value
 * @param includeZero
 */
function isTrue(value, includeZero = true){
  if (typeof value === 'number') {
    if (includeZero) {
      if (value === 0) {
        return true
      }
    }
  }
  return !!value
}

/**
 * 返回想要的真值，默认数字0是真值
 * @param value
 * @param includeZero 0是否是真值，默认true
 * @param defaultValue 当为false时候的默认值
 * @returns
 */
function trueValue(value,includeZero = true,defaultValue = ''){
  if (typeof value === 'number') {
    if (includeZero) {
      if (value === 0) {
        return value
      }
    }
  }
  return value || defaultValue
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

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 */
 const debounce = function(func, wait = 1000, immediate = true) {
  let timer;
  return function() {
    let context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait)
    }
  }
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 使用表时间戳，在时间段开始的时候触发 2 使用表定时器，在时间段结束的时候触发
 */
const throttle = (func, wait = 1000, type = 1) => {
  let previous = 0;
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * 高效合并两个数组，根据指定的唯一标识字段判断是否需要合并
 *
 * @param {Array<Object>} arr1 - 第一个数组，包含对象元素
 * @param {Array<Object>} arr2 - 第二个数组，包含对象元素
 * @param {Object} [options] - 配置选项
 * @param {string} [options.idField='id'] - 用作唯一标识的字段名，默认为'id'
 * @param {boolean} [options.addNonExisting=false] - 是否添加在arr1中不存在的arr2项
 * @returns {Array<Object>} 合并后的数组
 *
 * @example
 * const arr1 = [{id: 1, name: "p"}];
 * const arr2 = [{id: 1, age: 12}, {id: 2, name: "q"}];
 *
 * // 使用默认配置（以id为唯一标识，不添加不存在的项）
 * mergeArrays(arr1, arr2); // [{id: 1, name: "p", age: 12}]
 *
 * // 使用自定义唯一标识字段
 * const users1 = [{userId: "a1", name: "Alice"}];
 * const users2 = [{userId: "a1", email: "alice@example.com"}];
 * mergeArrays(users1, users2, { idField: "userId" });
 * // [{userId: "a1", name: "Alice", email: "alice@example.com"}]
 *
 * // 添加不存在的项
 * mergeArrays(arr1, arr2, { addNonExisting: true });
 * // [{id: 1, name: "p", age: 12}, {id: 2, name: "q"}]
 */
function mergeArrays(arr1, arr2, options = {}) {
  // 设置默认选项
  const {
    idField = 'id',
    addNonExisting = false
  } = options;

  // 创建一个Map用于存储合并后的结果
  const mergedMap = new Map();

  // 先将第一个数组的所有项添加到Map中
  arr1.forEach(item => {
    if (item && typeof item === 'object' && idField in item) {
      mergedMap.set(item[idField], { ...item });
    }
  });

  // 合并第二个数组的项
  arr2.forEach(item => {
    if (item && typeof item === 'object' && idField in item) {
      const keyValue = item[idField];

      if (mergedMap.has(keyValue)) {
        // 如果唯一标识已存在，则合并对象属性
        mergedMap.set(keyValue, { ...mergedMap.get(keyValue), ...item });
      } else if (addNonExisting) {
        // 如果设置了addNonExisting选项为true且唯一标识不存在，则直接添加
        mergedMap.set(keyValue, { ...item });
      }
    }
  });

  // 将Map转换回数组
  return Array.from(mergedMap.values());
}

/**
 * 通用异步循环处理工具函数 - 用于处理需要循环执行的异步操作并汇总结果
 *
 * @param {Array} items - 需要处理的参数数组，每一项将作为主要参数传递给异步函数
 * @param {Function} asyncFn - 处理每个参数的异步函数，接收(当前项, ...extraArgs)并返回Promise
 * @param {Function} resultHandler - 处理每次异步调用结果的函数，接收(累积结果, 当前结果, 当前索引, 当前项)
 * @param {*} initialValue - 结果累积的初始值，作为resultHandler的首次调用时的acc参数
 * @param {Object} options - 配置选项
 * @param {boolean} options.parallel - 是否并行执行，默认为false（串行执行）
 * @param {number} options.concurrency - 并行时的并发数，默认为Infinity（无限制）
 * @param {Function} options.errorHandler - 错误处理函数，接收(错误, 当前项, 当前索引)
 * @param {Array} extraArgs - 传递给异步函数的额外参数，会在每次调用时传入
 * @returns {Promise<*>} - 返回累积的最终结果
 * 示例
 * // 示例1：串行收集结果到数组 - 演示带额外参数的基本用法
 *   const items = [1, 2, 3, 4, 5];
 *   const fetchData = async (id, apiKey, baseUrl) => {
 *     // 模拟API调用延迟
 *     await new Promise(resolve => setTimeout(resolve, 100));
 *     // 返回结果包含ID和额外参数
 *     return { id, value: id * 10, apiKey, baseUrl };
 *   };
 *
 *   // 将所有成功的结果收集到数组中，并传递额外参数
 *   const results = await processAsync(
 *     items,                              // 要处理的ID数组
 *     fetchData,                          // 异步处理函数
 *     (acc, curr) => [...acc, curr],      // 结果累积器：将当前结果添加到数组
 *     [],                                 // 初始值为空数组
 *     {},                                 // 无特殊选项
 *     "my-api-key",                       // 额外参数1：API密钥
 *     "https://api.example.com"           // 额外参数2：基础URL
 *   );
 *   console.log(results);
 *
 *   // 示例2：并行处理并统计结果 - 演示并行处理和数值累积
 *   const numbers = [10, 20, 30, 40, 50];
 *   const calculate = async (num, multiplier, offset) => {
 *     // 模拟随机计算延迟
 *     await new Promise(resolve => setTimeout(resolve, Math.random() * 200));
 *     // 使用额外参数进行计算
 *     return num * multiplier + offset;
 *   };
 *
 *   // 计算所有处理结果的总和，并传递额外参数
 *   const sum = await processAsync(
 *     numbers,                            // 要处理的数字数组
 *     calculate,                          // 异步计算函数
 *     (acc, curr) => acc + curr,          // 结果累积器：将当前结果添加到总和
 *     0,                                  // 初始值为0
 *     {
 *       parallel: true,                   // 启用并行处理
 *       concurrency: 2                    // 最大并发数为2
 *     },
 *     2,                                  // 额外参数1：乘数
 *     5                                   // 额外参数2：偏移量
 *   );
 *   console.log(sum);
 *
 *   // 示例3：错误处理 - 演示错误处理和自定义错误回调
 *   const urls = ['url1', 'url2', 'invalid-url', 'url4'];
 *   const fetchUrl = async (url, headers, timeout) => {
 *     // 模拟错误情况
 *     if (url === 'invalid-url') throw new Error('Invalid URL');
 *     // 模拟API调用延迟
 *     await new Promise(resolve => setTimeout(resolve, 100));
 *     // 返回包含额外参数的结果
 *     return `Response from ${url} with timeout ${timeout}ms and headers ${JSON.stringify(headers)}`;
 *   };
 *
 *   const validResponses = await processAsync(
 *     urls,                               // 要处理的URL数组
 *     fetchUrl,                           // 异步获取函数
 *     (acc, curr) => [...acc, curr],      // 结果累积器：将当前结果添加到数组
 *     [],                                 // 初始值为空数组
 *     {
 *       parallel: true,                   // 启用并行处理
 *       // 自定义错误处理函数
 *       errorHandler: (err, url) => console.log(`Error fetching ${url}: ${err.message}`)
 *     },
 *     { Authorization: "Bearer token" },  // 额外参数1：请求头
 *     5000                                // 额外参数2：超时时间
 *   );
 *   console.log(validResponses);
 */
async function processAsync(
  items,
  asyncFn,
  resultHandler = (acc, curr) => curr, // 默认只返回当前结果
  initialValue = undefined,           // 默认初始值为undefined
  options = {},                       // 默认选项为空对象
  ...extraArgs                        // 额外参数收集到数组中
) {
  // 解构配置选项，设置默认值
  const {
    parallel = false,                                // 默认串行执行
    concurrency = Infinity,                          // 默认无限制并发
    errorHandler = (err) => console.error(err)       // 默认错误处理为控制台输出
  } = options;

  // 初始化结果变量
  let result = initialValue;

  // ===== 串行执行逻辑 =====
  if (!parallel) {
    // 按顺序处理每一项
    for (let i = 0; i < items.length; i++) {
      try {
        // 调用异步函数，传入当前项和额外参数
        const currentResult = await asyncFn(items[i], ...extraArgs);
        // 使用结果处理函数更新累积结果
        result = resultHandler(result, currentResult, i, items[i]);
      } catch (error) {
        // 发生错误时调用错误处理函数
        errorHandler(error, items[i], i);
        // 错误不中断循环，继续处理下一项
      }
    }
    return result;
  }

  // ===== 并行执行逻辑 =====
  if (parallel) {
    // ----- 处理无限制并发的情况 -----
    if (concurrency === Infinity) {
      // 为所有项创建Promise数组
      const promises = items.map((item, index) =>
        // 调用异步函数并处理结果
        asyncFn(item, ...extraArgs)
          .then(currentResult => ({
            success: true,             // 标记成功
            data: currentResult,       // 保存结果数据
            index,                     // 保存原始索引
            item                       // 保存原始项
          }))
          .catch(error => {
            // 处理错误但不中断流程
            errorHandler(error, item, index);
            return {
              success: false,          // 标记失败
              index,
              item
            };
          })
      );

      // 等待所有Promise完成
      const results = await Promise.all(promises);

      // 处理所有成功的结果
      for (const res of results) {
        if (res.success) {
          // 只处理成功的结果
          result = resultHandler(result, res.data, res.index, res.item);
        }
      }

      return result;
    }

    // ----- 处理有限制并发的情况 -----
    // 将项目分割成多个块，每个块大小为concurrency
    const chunks = [];
    for (let i = 0; i < items.length; i += concurrency) {
      chunks.push(items.slice(i, i + concurrency));
    }

    // 按块顺序处理，每个块内并行
    for (const chunk of chunks) {
      // 为当前块创建Promise数组
      const promises = chunk.map((item, chunkIndex) => {
        // 计算在原始数组中的实际索引
        const index = chunks.indexOf(chunk) * concurrency + chunkIndex;
        // 调用异步函数并处理结果
        return asyncFn(item, ...extraArgs)
          .then(currentResult => ({
            success: true,
            data: currentResult,
            index,
            item
          }))
          .catch(error => {
            errorHandler(error, item, index);
            return { success: false, index, item };
          });
      });

      // 等待当前块的所有Promise完成
      const chunkResults = await Promise.all(promises);

      // 处理当前块中所有成功的结果
      for (const res of chunkResults) {
        if (res.success) {
          result = resultHandler(result, res.data, res.index, res.item);
        }
      }
    }

    return result;
  }
}



