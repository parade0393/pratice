"use strict";
let myFavNum; //myFavNum类型是string或者number,不能是其他类型
myFavNum = "three"; //这个时候会推断出myFavNum的类型是string
console.log(myFavNum.length);
myFavNum = 3; //这个时候会推断出myFavNum的类型是number
// console.log(myFavNum.length)//编译报错
//访问联合类型的属性和方法:
//当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
let myConst; //这中就是值类型，值只能是"parade"或者7 类似与枚举
let a = "";
