console.log('promise对象');

// Promise.prototype.then方法：链式操作
// Promise.prototype.catch方法：捕捉错误
// Promise.all方法，Promise.race方法
// Promise.resolve方法，Promise.reject方法
// async函数

//基本用法
// let promise = new Promise(function(resolve,reject){
//     if(succss){
//         resolve(value);
//     }else{
//         reject(error);
//     }
// });
// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve方法和reject方法。如果异步操作成功，则用resolve方法将Promise对象的状态变为“成功”（即从pending变为resolved）；如果异步操作失败，则用reject方法将状态变为“失败”（即从pending变为rejected）。
// 实例生成之后，可以用then方法指定resolve和reject方法的回调函数
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve,ms);
    })
}
timeout(100).then( () => {
    console.log('done');
});

//ajax实例
function getJson(url){
    return new Promise((resolve,reject)=>{
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
        function handler(){
            if(this.status == 200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        }
    })
}
// getJson('/posts.json').then( (json)=>{
//     //成功
// } , ()=>{
//     //失败
// });

var p1 = new Promise(function(resolve, reject){
    // ... some code
});

var p2 = new Promise(function(resolve, reject){
    // ... some code
    resolve(p1);
})
//p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，这时p1的状态就会传递给p2。如果调用的时候，p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是fulfilled或者rejected，那么p2的回调函数将会立刻执行。

//2.Promise.prototype.then 链式操作
// getJson(url).then( (json)=>{
//    return  json.result;
// } ).then( (result)=>{
//     //...
// });
//第一个then会把返回的结果作为参数，传入第二个then
//如果前一个回调函数返回的是Promise对象，后一个回调函数会等待promise对象有了运行结果，再进一步调用
// getJson(url).then( (json)=>{
//     return getJson(url2);
// }).then( ()=>{
//    //....等待getJson有结果
// });

//3.promise.prototype.catch 捕捉错误
//Promise.prototype.then(null, rejection)的别名
// getJson(url).then( (json)=> {
//     //do
// }).catch( (error)=> {
//     //错误处理
// });
//promise对象具有冒泡性质，会一直向后传递，直到捕获为止

//4.promise.all方法 promise.race方法
// var p = Promise.all([p1,p2,p3]);
//promise.all接受一个数组作为参数
//p的状态由p1、p2、p3决定
//只有p1,p2,p3的状态都变为fulfilled的时候，p才会变成fullfilled，此时p1,p2,p3返回值组成一个数组，传递给p的回调函数
//只要三个中有一个rejected，p的状态就是rejected，第一个被reject的实例的返回值，传递给p的回调函数
// var promise = [2,3,4,5].map( (id)=> {
//     return getJson('/post/'+id+'.json');
// });
// Promise.all(promise).then( (posts)=>{
//     //...
// }).catch( (error)=>{
//
// });

//promise.race将多个promise实例包装成一个新的promise实例
// var p = Promise([p1,p2,p3]);
//只要有一个实例率先改变状态，p就跟着改变状态，率先改变的promise实例的返回值，传递给p的返回值

//5.Promise.resolve ,Promise.reject
//Promise.resolve将现有的对象转为promise对象
// var jsPromise = Promise.resolve($.ajax(url));
// 上面的代码生成deferred对象，转为一个新的es6的promise对象
// 如果参数不是具有then方法的对象，则返回一个新的promise对象，且他的状态为fulfilled
// var p = Promise.resolve('Hello');
// p.then( (s)=>{ console.log(s) }); // Hello

//Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。Promise.reject方法的参数reason，会被传递给实例的回调函数。
// var p = Promise.reject('出错了');
// p.then(null, function (s){
//     console.log(s)
// });
// // 出错了

//6.async函数 es7
//只要函数名之前加上async关键字，就表明该函数内部有异步操作。该异步操作应该返回一个Promise对象，前面用await关键字注明。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
// async function getStockPrice(symbol, currency) {
//     let price = await getStockPrice(symbol);
//     return convert(price, currency);
// }

// function timeOut(ms){
//     return new Promise( (resolve)=>{
//         setTimeout(resolve,ms);
//     } )
// }
// async function asyncValue(value){
//     await timeOut(100);
//     return value;
// }
//

