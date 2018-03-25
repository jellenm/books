console.log('Set和Map');

// 1.Set的用法
// 2.Map的用法

//1.Set的用法
//ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
//通过size属性获取set数据的长度
//通过add方法来为set添加数据
//add(),delete(),has(),clear()


let arr1 = new Set([1,2,3,1,2,3,4]);
console.log(arr1);              //[1,2,3,4]
console.log(arr1.size);         // 4
arr1.add('1');
console.log(arr1);              //[1,2,3,4,'1']


//判断是否有某个数据
//对象写法
let obj1 = {
    name:'jellen'
};
console.log(obj1['name']);      //jellen
//set写法
let arr2 = new Set([1,2,3,4,'1']);
console.log(arr2.has('1'));     //true

//同过Array.from()来将Set结构转为数组
let arr = Array.from(arr2);
console.log(arr2);  //仍然是set结构
console.log(arr);  //[1,2,3,4,5,'1'] 不是set结构

//用于数组去重
function dedupe(arr){
    return Array.from(new Set(arr));
}
let arr3 = [1,2,3,4,5,1,'1'];
console.log(dedupe(arr3));  //[1,2,3,4,5,'1'] 不是set结构

//遍历方法
//由于set结构默认遍历器就是values方法，所以不需要转化
let arr4 = [1,2,3,4,5,6,'2'];
for(let item of arr4){
   console.log(item);
}
console.log(arr4); //[1,2,3,4,5,6,'2']

for(let [index,item] of arr4.entries()){
    console.log(item +'  ' +item +'\n'); //值就是键
}
//forEach方法
arr4.forEach(function(item,index,arr){
    arr[index] = item +1;
});
console.log(arr4); //[2, 3, 4, 5, 6, 7, "21"]

//便捷的数组去重方法
let arr5 = [1,2,3,1,4,2,5];
let arr6 = [...new Set(arr5)];
console.log(arr6);  //[1,2,3,4,5]

//数组方法map和filter也可以用于set
arr6.map((item,index,arr)=>{ console.log(item +'  '+index)});
let arr7 = arr6.filter((item,index,arr)=>{ return item>3 });
console.log(arr7);      //[4,5]

//获取两个数组交集和并集的方式
//交集
let arr8 = [1,2,3,4,8];
let arr9 = [2,3,4,9,0];
let arr10 = [...new Set([...arr8,...arr9])];
console.log(arr10); //[1, 2, 3, 4, 8, 9, 0]

let arr12 = new Set(arr8);
let arr13 = new Set(arr9);
let arr11 = new Set([...arr12].filter(item =>{ return arr13.has(item)}));
console.log(arr11); //[2,3,4]

//weakSet()
// 首先，WeakSet的成员只能是对象，而不能是其他类型的值。其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

let arr14 = [[12,21],[13,31]];
let ws = new WeakSet(arr14);
let obj = {};

ws.add(window);
console.log(ws.has(window));        //true
ws.add(obj);
console.log(ws.has(obj));           //true
ws.delete(window);
console.log(ws.has(window));        //false




//2.Map的用法
// js的对象，本质上是键值对的集合，但是只能用字符串来作为键，带来了很大的限制，
// Map可以使用各种类型的值党最键 包括对象
// 属性 size, 方法 set(),get(),has(),delete(),clear()
// 对象是引用类型数据，要注意对象键的使用，有两个特殊值-0和+0相等，NaN和NaN相等
// 遍历 keys(),values(),entries()

let object1 = {p:'123'};
let object2 = new Map();
object2.set(object1,'hello world');
console.log(object2.get(object1)); //'hello world;

let object3 = new Map();
object3.set('1','hello');
object3.set('2',' world');
for(let [index,item] of object3){   //默认遍历就是entries 不用写
    console.log(item);
}

//Map数据结构可以转化为 数组 ...map,转换完了 可以通过map 和filter方法对数据进行遍历和过滤
let array1 = [...object3];
console.log(array1);     //[['1','hello'],['2','world']]
let array2 = [...object3.keys()];
console.log(array2);        // ['1','2']
console.log([...object3.values()]); //['hello','world']

//WeakMap
// WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受原始类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。































