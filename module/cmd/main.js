/**
 * 模块标适分为相对标适和顶级标适，导入就根据标适进行导入。相对标适就是以.开头的相对路径，顶级标适就是在config里配置的别名
 * require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口。
 * require.resolve require.resolve(id)
 * 使用模块系统内部的路径解析机制来解析并返回模块路径。该函数不会加载模块，只返回解析后的绝对路径。
 *
 * exports 是一个对象，用来向外提供模块接口。除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。
 * exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。
 * module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。id:模块的唯一标识。uri:根据模块系统的路径解析规则得到的模块绝对路径。一般情况下（没有在 define 中手写 id 参数时），module.id 的值就是 module.uri，两者完全相同。
 * dependencies：是一个数组，表示当前模块的依赖。
 * module.exports Object 当前模块对外提供的接口。对 module.exports 的赋值需要同步执行，// 重新给 module.exports赋值  module.exports = new SomeClass();
 */
define(function (require, exports, module) {
    //这里可以使用require按需引入其他模块
    //可以使用exports或者module.exports导出模块内容
    // var util = require("./utils.js")//相对标适
    // var _$ = require("jquery")//顶级标适
});
