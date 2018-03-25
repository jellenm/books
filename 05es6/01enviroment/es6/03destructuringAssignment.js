console.log('3.解构赋值');

// 解构赋值 可以从数组或者对象中提取数据的方法
// 如果赋值不成功，变量的值为undefined
// 允许默认值

//1.数组的解构赋值
function desArr() {
    console.log('数组');
    let [a, b, c] = [1, 2, 3];
    console.log(a, b, c);

    let [a, [b, [c]]] = [1, [2, [3]]];
    console.log(a, b, c);

    let [a, ...c] = [1, 2, 3, 4, 5, 6, 7];
    console.log(a, c);

    // var [foo] = undefined; //报错
    // var [foo] = null; //报错

    let [a = 3, b] = [, 55];
    console.log(a, b);

    let [a, b = 3] = [1];
    console.log(a, b);
}
desArr();

//2.对象解构赋值
function desObj() {
    console.log('对象');
    let {a, b} = {b: 2, a: 1};
    console.log(a, b);

    //对象名和属性名不一致
    let {foo: baz} = {foo: 'aaa', bar: '222'};
    console.log(baz);

    //嵌套
    let {p: [x, {y}]} = {p: ['hello', {y: 'jellen'}]};
    console.log(x, y);

    //指定默认值
    let {x = 3, y} = {y: 5};
    console.log(x, y);

    //已声明的变量
    let x;
    // {x} = {x:222}; //报错
    ({x} = {x: 222})  //需这么写
    console.log(x);

}
desObj();

//3.用途

//返回数组
function returnArr() {
    return [1, 2, 4];
}
let [x, y, z] = returnArr();
console.log(x, y, z);


//返回对象
function returnObj() {
    return {
        foo: '123',
        bar: '22'
    }
}
let {foo, bar} = returnObj();
console.log(foo, bar);


//函数参数的定义
function fun1([x]) {
    console.log(x);
}
fun1(['a']);
function fun2({foo, bar}) {
    console.log(foo, bar);
}
fun2({foo: 'hello ', bar: 'jellen'});


//函数参数的默认值
function fun3({arg1 = 1, arg2 = 2, arg3 = 3}) {
    console.log(arg1, arg2, arg3);
}
fun3({arg1: 3, arg2: 2});


//遍历map解构
let map = new Map();
map.set('name1', 'jellen1');
map.set('name2', 'jellen2');
for (let [key, value] of map) {
    console.log(key + ' is ' + value + '\n');
}
// 获取键名
for (let [key] of map) {
    // ...
}
// 获取键值
for (let [, value] of map) {
    // ...
}





























