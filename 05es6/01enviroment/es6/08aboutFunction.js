console.log('函数扩展');

// 1.函数参数的默认值
// 2.rest参数
// 3.扩展运算符
// 4.箭头函数

// 1.函数参数的默认值
function log(x,y){
    y = y||'world';
    console.log(x,y);
}
log('hello');       //hello world
log('hello','');    //hello world  ---这种结果并不是我们想要的
//es5的做法
// typeof y == 'undefined'  或者  arguments.length == 1

function relog(x,y = 'world'){
    console.log(x,y);
}
relog('hello');         //hello world
relog('hello','');      //hello

// 有了默认值的参数，需要放在参数的最后面，因为可以省略
//(x=5,y) 报错 === (y,x=5)

//******传入 undefined是默认值，null则是null *******
function relog2(x=1,y=2){
    console.log(x,y);
}
relog2(undefined,null);     //1,null

//******传入 设置了默认值后，函数的length属性，将返回没有指定默认值的参数个数 *******
console.log(relog2.length);         //0
console.log(relog.length);          //1

//指定一个参数必须有值，否则抛出错误
function throwErr(){
    throw new Error('没有参数');
}
function func1(x = throwErr()){
    console.log('没有报错');
}
func1('1');     //没有报错
// func1();        //报错(没有参数)


//2.rest参数
//函数的length 不包括rest参数，rest参数之后，不能再有其他参数
function func2(...x){
    console.log(x);
}
func2(1,2,3,4,5);   //[1,2,3,4,5]


function func3(arr,...x){
    x.forEach(function(item){
        arr.push(item);
    });
    console.log(arr);
}
func3([],1,2,3,4,5);    //[1,2,3,4,5]
//扩展运算符... 好比rest的逆运算
function func4(x,y){
    return x+y;
}
let array = [1,2];
console.log(func4(...array));       //3


function add1(x,y,z){
    console.log(x+y+z);
}
let array2 = [1,2,3];
//es5
add1.apply(null,array2);        //6
//es6
add1(...array2);                //6


let array3 = [1,2];
let array4= [3,4];
let array5 = [5,6];
let array6 = [...array3,...array4,...array5];
console.log(array6);        //[1,2,3,4,5,6]

//字符串转为数组
let str = 'hello';
console.log([...str]);      //['h','e','l','l','o']

//只要是Iterator接口的对象，都可以使用扩展运算符
let map = new Map([
    [1,'m'],
    [2,'a'],
    [3,'p']
]);
console.log([...map.keys()]);   //[1,2,3]


// 4.箭头函数
// ******函数体内的this对象，是绑定定义时所在的对象，而不是使用时所在的对象********
// ******不可以当做构造函数，不可以使用new命令，否则会抛出错误******
// ******不可以使用arguments对象，该对象在体内不存在******

let f = v=>v;
let f1 = function(v){ return v; };

//当多个参数时，用圆括号
let sum = (x,y) => x + y;

//如果箭头函数的代码部分多余一条，则需要用大括号括起来
let minus = (x,y) => { return x-y; };

//如果返回的是对象，由于对象是大括号，会以为是代码块，所以需要在外面加上括号
let chen = id => ({id,name:'Jellen'});

//简化回调函数
[1,2,3,4].map(function(x){ return x*x});
[1,2,3,4].map(x=>x*x);

//函数内的this对象
let handler = {
    id:'123',
    sayId(name) {
        console.log(name + ' ' +this.id);
    },
    init() {
        document.addEventListener('click',event=> {this.sayId('jellen')},false )
    }
};
handler.init();     // click document ==== jellen 123


















