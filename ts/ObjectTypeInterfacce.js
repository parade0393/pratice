var tom = {
    name: "parade",
    age: 2
}; //正常情况下定义的对象的遍历必须和接口一摸一样(个数和变量类型)， 定义的变量比接口少了一些属性是不允许的：多一些也是不允许的
var circle = {
    name: "圆形" //可选属性的含义是该属性可以不存在。
    //但是仍然不允许添加新的属性
};
var apple = {
    name: "苹果",
    color: "red",
};
var orangeDrink = {
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
//像这种key和value的类型都确定的可以使用索引类型
var frontLanguage = {
    0: "HTML",
    1: "CSS",
    2: "JavaScript",
    3: "Vue",
};
var add = function (n1, n2) { return n1 + n2; };
function calc(n1, n2, calcFn) {
    return calcFn(n1, n2);
}
calc(20, 30, add);
var some = {
    name: "pa",
    age: 12
};
window.grade = 124;
var info = {
    name: "pa",
    age: 32,
    height: 1.7,
    address: "北京"
};
var p = info; //这样写可以，把一个引用赋值给一个变量时，会进行freshness，除了多余的变量，剩下的符合类型就可以
// const  p1:IPerson = {//直接以字面量的形式赋值不可以,字面类赋值必须和类型的变量一摸一样
//     name:"pa",
//     age:32,
//     height:1.7,
//     address:"北京"
// }
//# sourceMappingURL=ObjectTypeInterfacce.js.map