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

//接口声明了索引类型，代表key只能是number类型，值只能是string类型
interface IndexLanguage{
    [index:number]:string//索引签名
}

//像这种key和value的类型都确定的可以使用索引类型
const frontLanguage:IndexLanguage = {
    0:"HTML",
    1:"CSS",
    2:"JavaScript",
    3:"Vue",
}

//可调用的接口，可当作函数使用
interface CalcFn{
    (n1:number,n2:number):number//这是一个函数
}

const add:CalcFn = (n1,n2)=> n1+n2

function calc(n1:number,n2:number,calcFn:CalcFn) {
    return calcFn(n1,n2)
}
calc(20,30,add)

interface ISwim{
    swimming:()=>void
}

interface IFly{
    flying:()=>void
}
type MyType1 = ISwim | IFly//可以是其中任意一个类型
type  MyType2 = ISwim & IFly//必须同时是两个类型

interface OneType {
    name:string
}
interface OneType{
    age:number
}
const some:OneType = {
    name:"pa",
    age:12
}

interface Window {
    grade:number
}
window.grade = 124
interface IPerson{
    name:string,
    age:number,
    height:number
}
const  info = {
    name:"pa",
    age:32,
    height:1.7,
    address:"北京"
}
const p:IPerson = info//这样写可以，把一个引用赋值给一个变量时，会进行freshness，除了多余的变量，剩下的符合类型就可以
// const  p1:IPerson = {//直接以字面量的形式赋值不可以,字面类赋值必须和类型的变量一摸一样
//     name:"pa",
//     age:32,
//     height:1.7,
//     address:"北京"
// }



