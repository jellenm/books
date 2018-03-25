console.log('1.let讲解')
//闭包是有权访问另一个函数作用域的变量的函数，当外部的函数内的闭包函数被外部函数的一个变量引用时候，这时候是通常所谓的闭包--return
//匿名函数是没有名称的函数
    

// 函数表达式，在执行的时候读取作用域的i值，他们都是用的同一个值，所以返回的都是10
function getI1(){
    var arr =[];
    for(var i=0;i<10;i++){
        arr[i] = function(){
            console.log(i);
        }
    }
    return arr;
}
var I1 = getI1();
I1[6]();

//利用立即执行的函数表达式来执行,参数是按值传递的，闭包读取上一级的作用域,即立即执行的匿名函数的作用域
function getI2(){
    var arr=[];
    for(var i=0;i<10;i++){
        arr[i] = (function(num){
            return function(){
                console.log(num);
            }
        })(i);
    }
    arr[6]();
}
getI2();


//let作用域块级作用域
//用let不会发生变量提升的现象,块级作用域
function getI3(){
    var arr=[];
    for(var i=0;i<10;i++){
        let num = i;
        arr[i] = function(){
            console.log(num);
        }
    }
    arr[6]();
}
getI3();



//ES6规定，函数本身的作用域，在其块级作用域内，不会影响到外面
function f(){ console.log('Iam Outside')}
(function(){
    if(true){
        function f(){ console.log( 'Iam Inside')}
    }
    f(); //在es5的情况下 输出Iam Inside 在es6的情况下，输入Iam outside
})();


//let块级作用域影响不了上一层，而es5的var声明则不一样
(function(){
    let n = 10;
    var m = 10;

    if(true){
        let n = 100;
        var m = 100;
    }

    console.log(n,m);
})();
