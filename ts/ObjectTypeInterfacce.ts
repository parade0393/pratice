//TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
interface Person {
    name:string,
    age: number;
}
let tom:Person = {
    name:"parade",
    age: 2
}//正常情况下定义的对象的遍历必须和接口一摸一样(个数和变量类型)， 定义的变量比接口少了一些属性是不允许的：多一些也是不允许的

//可选属性
interface Shape{
    name:string,
    age?: number;//用来定义可选属性
}
let circle:Shape = {
    name:"圆形"//可选属性的含义是该属性可以不存在。
    //但是仍然不允许添加新的属性
}
//有时候我们希望接口中可以是任意属性，可以这样写,需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
interface Fruit{
    name:string,
    // weight:number
    [propName:string]:any;//使用 [propName: string] 定义了任意属性取 string 类型的值。
}
let apple:Fruit = {
    name:"苹果",
    color:"red",
    // weight:23
}

interface Food{
    name:string,
    [propName:string]:string
    // weight:number;//由于任意类型是string类型的，所以weight应该是string的子类型，这里可以用any或者联合类型来解决
}

//万能类型,不过这样就没有了提示
interface Drink{
    [properName:string]:any
}
let orangeDrink:Drink = {
    name:"句子",
    age:23,
    color: "red",
    weight:34,
    level:"2",
    food:{
        name:"十五",
        price:"19",
        color:"red"
    },
    arr:[1,"2",{name:"arr"}]
}
console.log(orangeDrink.arr[2].name)
console.log(orangeDrink.weight)



