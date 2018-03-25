console.log('数值扩展');

//1.二进制和八进制表示法
//2.Number.isFinite(),Number.isNaN()
//3.Number.parseInt(),Number.parseFloat()
//4.Number.isInteger(),Number.isSafeInteger()安全整数
//5.Math对象的扩展

//1.二进制和八进制表示法
//用0b和0o代表二进制和八进制，逐步淘汰es5中的O的写法
//注意 0和O
console.log(0b111110111);
console.log(0o767);


//2.Number.isFinite(),Number.isNaN() ,isFinite(),isNaN()
//后两个可以通过转换，而前两个只对数值进行判断，非数值一律false
console.log(Number.isFinite(3));        //true
console.log(Number.isFinite(Infinity)); //false
console.log(isFinite(false));           //true
console.log(Number.isFinite(false));    //false

console.log(Number.isNaN(NaN));         //true
console.log(Number.isNaN('色卡'));       //false
console.log(isNaN(NaN));                //true
console.log(isNaN('色卡'));              //true


//3.Number.parseInt(),Number.parseFloat(),parseInt(),parseFloat() 行为不变

//Number.isInteger(),Number.isSageInteger
// js中 整数和浮点数是同样的储存方式，所以3和3.0被视为一个值
// js能标识-2^52和2^52 所以es6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
// Number.isSafeInteger()，就是用来判断整数是否在这两个常量之间

console.log(Number.isInteger(3));   //true
console.log(Number.isInteger(3.0)); //true
console.log(Number.isInteger(3.5)); //false
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER+1)); //false
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER-1)); //true


//5.Math对象的扩展
//Math.trunc() --- 取整  Math.sign()正负0和NaN
console.log(Math.trunc(3.5));   //3
console.log(Math.trunc(-3.5));  //-3
console.log(Math.sign(-1));     //-1
console.log(Math.sign(0));      //0
console.log(Math.sign(1));      //1
console.log(Math.sign('是的'));   //NaN

//
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
// Math.cbrt(x) 返回x的立方根
// Math.clz32(x) 返回x的32位二进制整数表示形式的前导0的个数
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.expm1(x) 返回eˆx - 1
// Math.fround(x) 返回x的单精度浮点数形式
// Math.hypot(...values) 返回所有参数的平方和的平方根
// Math.imul(x, y) 返回两个参数以32位整数形式相乘的结果
// Math.log1p(x) 返回1 + x的自然对数
// Math.log10(x) 返回以10为底的x的对数
// Math.log2(x) 返回以2为底的x的对数
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）












