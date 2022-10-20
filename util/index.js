function getParamByUrl(url,name) {
    // let reg = new RegExp(`[?&]${name}=[_a-zA-Z0-9%.-]*&?`)
    let reg = new RegExp(`[?&]${name}=[^#&]*&?`)
    let match = url.match(reg);
    if (match){
        return match[0].split("=")[1].replaceAll("&","")
    }else{
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
