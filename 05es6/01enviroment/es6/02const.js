console.log('2.const讲解')

//const和let声明类似，不能重复声明
//const和let的作用域类似，只在所在的块级作用域内有效


const PII = 3.1415926;
// PII = 3; //报错
console.log(PII);


if(true){
    const myName = 'jellen';
}
// console.log(myName);  //报错，myName不存在
