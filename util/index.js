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
            if (!isValidDate(tempDate)){
                time = new Date(originalTime).getTime()+8*3600*1000
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



