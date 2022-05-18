function getParamByUrl(url,name) {
    // let reg = new RegExp(`([?&])${name}=[a-zA-Z0-9]*(&)?`)
    let reg = new RegExp(`[?&]${name}=[a-zA-Z0-9]*&?`)
    let match = url.match(reg);
    if (match){
        return match[0].split("=")[1].replaceAll("&","")
    }else{
        return null
    }
}
