console.log('generator');

//generator
// Generator是一个普通函数，但是有两个特征。一是，function命令与函数名之间有一个星号；二是，函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态（yield语句在英语里的意思就是“产出”）
// babel 2015不支持

// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }
//
// var hw = helloWorldGenerator();

// hw.next()
// { value: 'hello', done: false }

// hw.next()
// { value: 'world', done: false }

// hw.next()
// { value: 'ending', done: true }

// hw.next()
// { value: undefined, done: true }

//yield语句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
// function* f() {
//     for(var i=0; true; i++) {
//         var reset = yield i;
//         if(reset) { i = -1; }
//     }
// }
//
// var g = f();
//
// g.next() // { value: 0, done: false }
// g.next() // { value: 1, done: false }
// g.next(true) // { value: 0, done: false }

// function* foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
// }
//
// var it = foo(5);
//
// it.next()
// // { value:6, done:false }
// it.next(12)
// // { value:8, done:false }
// it.next(13)
// // { value:42, done:true }

// 上面代码第一次调用next方法时，返回x+1的值6；第二次调用next方法，将上一次yield语句的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield语句的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

//for...of...可以循环generator函数，而且不用使用next()方法
// function *foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     return 6;
// }
//
// for (let v of foo()) {
//     console.log(v);
// }
// 1 2 3 4 5

//利用generator函数和for...of循环，实现斐波那契数列的例子
// function* fibonacci() {
//     let [prev, curr] = [0, 1];
//     for (;;) {
//         [prev, curr] = [curr, prev + curr];
//         yield curr;
//     }
// }
//
// for (let n of fibonacci()) {
//     if (n > 1000) break;
//     console.log(n);
// }
