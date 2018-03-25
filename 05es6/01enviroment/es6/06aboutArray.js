console.log('数组扩展');

//1.Array.from()
//2.Array.of()
//3.find()/findIndex()
//4.fill()
//5.entries()/keys()/values()
//6.数组推导
//7.Array.observe()/Array.unobserve() es7

//1.Array.from() 可以将两类类数组对象转为数组 （类数组对象，可遍历对象，es中的set的map结构）
function foo(){
    let arr = Array.from(arguments);
    console.log(arr); //[a,b,c]
}
foo('a','b','c');

console.log(Array.from({'a':1,'b':2,length:2}));    //[undefined,undefined]
console.log(Array.from({0:1,1:2,length:2}));        //[1,2]


//2.Array.of() 将一组值转为数组,参数可数不少于2
console.log(Array.of(1,2,3,4));                     //[1,2,3,4]


//3.find(),findIndex() 找到符合条件的第一个数组元素、第一个符合元素的位置
let res1 = [0,1,2,3,9].find(function(value,index,arr){
    return value >= 9;
});
console.log(res1);

let res2 = [0,1,2,3,9].findIndex(function(value,index,arr){
    return value >= 9;
});
console.log(res2);

//4.fill 填充整个数组，第一个参数是填充的元素，第二个参数是填充的其实位置，第三个参数是填充的结束位置
let res3 = [2,3,4,5].fill(7);
console.log(res3);
let res4 = [2,3,4,5].fill(7,1,2);
console.log(res4);


//5.entries()/keys()/values()
//遍历数组，entries()键值对的遍历，keys()键的遍历 ,values()值的遍历
let array1 = [1,2,3,4,5,6,7,8,9];
for(let index of array1.keys()){
    console.log(index);
}
// for(let ele of array1.values()){  //慎用，报错
//     console.log(ele);
// }
for(let [index,value] of array1.entries()){
    console.log(index + ' is '+value);
}


//6.数组推导 用现有的数组，生成新数组 //慎用，报错
// var array2 = [1,2,3,4,5,6];
// var arrary3 = [for (i of array2) i * 2];
// console.log(arrary3);




//es5的数组使用回顾
//forEach() 遍历数组，为每个元素调用指定的函数,参数 数组元素，数组索引，数组本身
let arr1 = [1,2,3,4,5,6,7,8];
arr1.forEach(function(value,index,arr){
    arr[index] = value*2;
});
console.log(arr1);  //[2,4,6,8,10,12,14,16]

//map() 返回一个数组，包含它的返回值
let arr2 = [1,2,3,4,5,6,7,8];
let arr3 = arr2.map(function(value,index,arr){
    return value*2;
});
console.log(arr3);  //[2,4,6,8,10,12,14,16]

//filter() 返回数组符合条件的子集
let arr4 = [1,2,3,4,5,6,7,8];
let arr5 = arr4.filter(function(value,index,arr){
    return value >5;
});
console.log(arr5);      //[6,7,8]

//every,some  返回true/false
let arr6 = [1,2,3,4,5,6,7,8];
let result1 = arr6.every(function(value){
    return value > 5;
});
let result2 = arr6.every(function(value){
    return value > 0 ;
});
let result3 = arr6.some(function(value){
    return value > 3;
});
let result4 = arr6.some(function(value){
    return value >10;
});
console.log(result1,result2,result3,result4);           //false true true false

//reduce(),reduceRight() 将数组元素组合，生成单个值, 方向相反,第一个参数为函数，第二个参数为初始值
let arr7 = [1,2,3,4,5,6,7,8];
let result5 = arr7.reduce(function(x,y){ return x+y },0);
let result6 = arr7.reduce(function(x,y){ return x*y },1);
let result7 = arr7.reduceRight(function(x,y){ return x+y },0);
let result8 = arr7.reduceRight(function(x,y){ return x*y },1);
console.log(result5,result6,result7,result8);   //36 40320 36 40320





























