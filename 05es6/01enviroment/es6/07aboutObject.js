console.log('对象扩展');

// 1.属性的简介表达式
// 2.属性名表达式
// 3.Object.is()
// 4.Object.assign()
// 5.proto属性,Object.setPrototypeOf(),Object.getPrototypeOf()
// 6.Symbol
// 7.Proxy
// 8.Object.observer(),Object.unobserver()

// 1.属性的简介表达式
function foo1(x,y){
    return {x,y}
}
let obj1 = foo1('hello','jellen');
console.log(obj1); // {x:'hello',y:'jellen'}


var birth = 'vvv';
var obj2 = {
    name:'jellen',
    birth,
    method() {
        console.log(this.name);
    }
};
console.log(obj2);
obj2.method();

// 2.属性表达式
let obj3 ={};
obj3['abc'+'d'] = '123';
console.log(obj3);

var prop1 = 'name';
let obj4 ={
    [prop1]:'jellen',
    ['abc'+'d']:'lee',
    ['first world']:'hello world',
    ['last '+'world']() {
        console.log('last world')
    }
};
obj4['last '+'world']();
console.log(obj4);

//3.Object.is()
// 比较两个值是否严格相等， ===
// +0 不等于 -0 , NaN 等于NaN
console.log(Object.is(-0,+0));      //false
console.log(Object.is(NaN,NaN));    //true

//4.Object.assign()
// 将源对象的可枚举属性复制到目标属性上
// 如果属性名有相同的，后者覆盖前者
var target ={c:2};
var source1 = {a:1,c:5};
var source2 = {b:2,c:33};
Object.assign(target,source1,source2);
console.log(target);
//为对象添加属性、方法、克隆对象、为属性指定默认值
class Point{
    constructor(x,y) {
        Object.assign(this,{x,y});
    }
}
let point1 = new Point('1','2');
console.log(point1);

Object.assign(Point.prototype,{
    sayName() {
        console.log('jellen');
    },
    sayJob() {
        console.log('IT');
    }
});
console.log(new Point('2','3'));

//只能克隆对象自身的值，不能获得继承的值
function clone1(origin){
    return Object.assign({},origin);
}
//获取自身和继承的值
function clone2(origin){
    let originProto = origin.getPrototypeOf(origin); //获取原型的值
    return Object.assign(Object.create(originProto),origin);
}
//为属性指定默认值
const DEFAULTS = {
    logLevel:0,
    outputFormat:'html'
};
function processContent(options){
    let option = Object.assign({},DEFAULTS,options);
}


// 5.proto属性,Object.setPrototypeOf(),Object.getPrototypeOf()
//proto属性 （一度正式被写入es6草案，但又被移除，但包括IE11都支持）
//es6写法
let obj6 ={a:1};
let obj5 = {
    _proto_:obj6,
    b:'2'
};
//等同于 Object.setPrototypeOf()
// let obj6 ={a:1};let obj5={};
// Object.setPrototypeOf(obj5,obj6);
// obj5.b = 2;
//es5写法
let obj7 = Object.create(obj6);
obj7.b = 2;
console.log(obj5,obj7);


//6.Symbol
// es6引入的一种新的数据类型Symbol，独一无二的id，由Symbol函数生成
let symbol1 = Symbol();
console.log(typeof symbol1); //symbol

let symbol2 = Symbol('Test');
console.log(symbol2.name);  // undefined

//不能与其他类型的值进行运算
// console.log(''+symbol2);  //报错

//可以转为字符串
console.log(String(symbol2));       //Symbol('Test')
console.log((symbol2).toString()); //Symbol('Test')

//每一个Symbol都不相等，保证产生一个独一无二的值
let w1 = Symbol();
let w2 = Symbol();
console.log(w1 === w2);     //false

//用于对象的属性，防止重复,有以下三种方式
let a={};
let mySymbol = Symbol();
a[mySymbol] = 'hello';
a = {
    [mySymbol]:'hello'
};
Object.defineProperty(a,mySymbol,{value:'hello'});

//Symbol不会出现在for...in循环中，也不会被Object.keys()，Object.getOwnPropertyNames()返回
//Object.getOwnPropertySymbols,Object.getOwnPropertyKeys方法都可以获取Symbol属性名
let obj8 ={};
let symbolProp = Symbol();
Object.defineProperty(obj8,symbolProp,{value:'2343'});
let symbolName = Object.getOwnPropertySymbols(obj8);
console.log(symbolName);
// console.log(obj8[symbolName]);  //报错，获取不到

//Reflect.ownKeys方法返回所有的键值
let obj9 ={
    [Symbol('my_key')]:1,
    a:1,
    b:2
};
console.log(Reflect.ownKeys(obj9)); // ["a", "b", Symbol(my_key)]

let symbolProp1 = Symbol();
let obj10 ={
    [symbolProp1]:'hello'
};
let obj11 ={
    [symbolProp1]:'hello1'
};
console.log(obj10[symbolProp1]);
console.log(obj11[symbolProp1]);




// 7.Proxy
// 目标对象之前，架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
// get/set/revoke
var person = {
    name:'张三',
    age:33
};
let objectProxy1 = new Proxy(person,{
    get(target,prop) {
        return 35;
    }
});
console.log(person.name);
console.log(objectProxy1.name);

let objectProxy2 = new Proxy(person,{
    get(target,prop) {
        if(prop in target){
            return target[prop];
        }else{
            return '没有该属性';
        }
    },
    set(target,prop,value) {
        if(prop === 'age'){
            if(value > 200){
                console.log('年龄不可能大于200');
            }else if(value < 10){
                console.log('年龄不可能小于10');
            }else{
                target[prop] = value;
            }
        }else{
            target[prop] = value;
        }
    }
});
console.log(objectProxy2.name);
console.log(objectProxy2.height);

let objectProxy3 = new Proxy({},{
    set(target,prop,value) {
        if(prop === 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError('不是整数');
            }
            if(value >= 200){
                throw new TypeError('年龄不能大于200');
            }

        }
        target[prop] = value;
    }
});
// objectProxy3.age = 200; //报错了，年龄不能大于200

//拦截Object.keys()  //慎用 不支持
let objectProxy4 = new Proxy({},{
    ownKeys(target) {
        return ['hello world'];
    }
});
console.log(Object.keys(objectProxy4));

//可取消的Proxy实例 Proxy.revocable
let target1 = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target1, handler);

proxy.foo = 123;
console.log(proxy.foo); // 123

revoke();
//console.log(proxy.foo) // TypeError: Revoked


//8.Object.observe()，Object.unobserve() 监听对象的变化  //慎用，不支持





































































