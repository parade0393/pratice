"use strict";
var _a;
const arr = [1, "3"];
let obj;
obj = { name: "p", age: "ER" };
let shopName = "apple";
let price = shopName; //骚操作 或者 shopName as any as number
//值类型
let a = "parade"; //这个时候a就是值类型，她的值只能是"parade"
function fn() {
    let a = "parade";
    let b = (x, y) => x + y;
    return [a, b]; //如果不加这个as，那么下面的m,n的类型就不确定
    //return [a,b] as const //和上面的效果是一样的
}
const [m, n] = fn();
class Cons {
    constructor(name, age) {
        this.name = name;
        //构造函数中使用修饰符会自动的加上属性
        this.age = age;
    }
}
let con = new Cons("name", 23);
(_a = con.age) === null || _a === void 0 ? void 0 : _a.toFixed(2);
con.age.toFixed(2);
