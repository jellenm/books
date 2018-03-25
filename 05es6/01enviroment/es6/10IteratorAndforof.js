console.log('Interator和for...of循环');

//Interator
let obj = {
    data:['hello','world'],
    [Symbol.interator]() {
        const SELF = this;
        let index = 0;
        return {
            next() {
                if(index < SELF.data.length){
                    return {
                        value: SELF.data[index++],
                        done:false
                    }
                }else{
                    return {
                        value:undefined,
                        done:true
                    }
                }
            }
        }
    }
};


//for...of...循环
//可以直接获取键值
let arr = ['red','yellow','blue','green'];
for( let color of arr){
    console.log(color);
}
let arr1 = new Set(['red','yellow','blue','green']);
let arr2 = new Map();
arr2.set('1','yellow');
arr2.set('2','blue');
arr2.set('3','green');
for(let [index,value] of arr2){
    console.log(index +' , '+value+',');
}

//数组可以直接获取每个键值，而对象可以直接获取键名
let obj2 ={
    'color1':'red',
    'color2':'green'
};
// for( value of obj2){    //慎用报错
//     console.log(value);
// }

//字符串
let str = 'hello world';
for(let al of str){
    console.log(al);    // h e l l o   w o r l d
}











