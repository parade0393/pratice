"use strict";
let tom = {
    name: "parade",
    age: 2
}; //正常情况下定义的对象的遍历必须和接口一摸一样(个数和变量类型)， 定义的变量比接口少了一些属性是不允许的：多一些也是不允许的
let circle = {
    name: "圆形" //可选属性的含义是该属性可以不存在。
    //但是仍然不允许添加新的属性
};
let apple = {
    name: "苹果",
    color: "red",
    // weight:23
};
let orangeDrink = {
    name: "句子",
    age: 23,
    color: "red",
    weight: 34,
    level: "2",
    food: {
        name: "十五",
        price: "19",
        color: "red"
    },
    arr: [1, "2", { name: "arr" }]
};
console.log(orangeDrink.arr[2].name);
console.log(orangeDrink.weight);
