const arr:(String | Number)[] = [1,"3"]
let obj:{name:String;age?:number|String}
obj = {name:"p",age:"ER"}
let shopName:string = "apple"
let price:number = shopName as unknown as number//骚操作 或者 shopName as any as number

//值类型
let a:"parade" = "parade"//这个时候a就是值类型，她的值只能是"parade"
function fn(){
    let a = "parade"
    let b = (x:number,y:number): Number => x+y
    return [a,b] as [typeof a,typeof b]//如果不加这个as，那么下面的m,n的类型就不确定
    //return [a,b] as const //和上面的效果是一样的
}
const [m,n] = fn()

class Cons{
    public age?:number//修饰符默认是public的
    constructor(public name:string,age?:number){
        //构造函数中使用修饰符会自动的加上属性
        this.age = age
    }
}
let con = new Cons("name",23)
con.age?.toFixed(2)
con.age!.toFixed(2)