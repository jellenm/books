console.log('class 和 module');



//1.class
//2.module

//1.class
//super代指父类的同名方法
//类和模块的内部，默认就是严格模式，所以不需要使用use strict

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '('+this.x+','+this.y+')';
    }
}

class ColorPoint extends Point{
    constructor(x,y,color) {
        super(x,y);
        this.color = color;
    }
    toString() {
        return this.color + ' ' +super.toString();
    }
}

let color =new ColorPoint(123,321,'red');
console.log(color.toString());  // red(123,321)



//2.module的基本用法（参见文件夹）14
// es6之前，社区制定了一些模块加载方案，主要是CommonJS和AMD两种，前者用于服务器，后者用于浏览器
// es6在语言规格层面上，实现了模块功能，完全可以取代CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案
// var {stat,exists,readFile} = require('fs');
// import {stat,exists,readFile} from 'fs';

//export , import命令

//profile.js
// var firstName = 'jellen';
// var lastName = 'Lee';
// var year = 1958;
// export {firstName,lastName,year};

//main.js
// import { firstName,lastName,year } from './profile.js';
// 别名 import { lastName as surname } from './profile.js';


//模块的整体输入,module命令
//circle.js
// function circle(radius){
//     return Math.PI*radius*radius;
// }
// function circumference(radius){
//     return 2*Math.PI*radius;
// }
// export {circle,circumference};

//main.js
// import * as circle from './circle';
// module circle from './circle'

//export default命令
//输出匿名函数，引用时候可以使用任何名称
// default.js
// export default function(){
//     return 'hello world';
// }
// //或者
// function foo(){
//     return 'hello world';
// }
// export default foo;
// //main.js
// export e1 from './default';
// console.log(e1()); //hello world

//也可以输出类
// export default class{ ... }
// import class1 from 'Myclass';
// let o = new class1();


//模块继承
//...
























