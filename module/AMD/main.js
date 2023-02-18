// require.config({
//     baseUrl :"./",
//     path :{
//         "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
//         "underscore": "underscore.min",
//     }
// })
//也可使用config()指定各模块路径和引用名
require(['./utils'],function (utils) {
    utils.request()
})
