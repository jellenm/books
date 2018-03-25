console.log('字符串的扩展');

//1.codePointAt()
//2.String.fromCodePoint()
//3.at() 大多数暂未实现
//4.字符的Unicode表示法
//5.正则表达式的u修饰符
//6.normalize()
//7.includes(),startsWith(),endsWith()
//8.repeat()
//9.正则表达式的y修饰符
//10.模板字符串


//针对（Unicode码点大于0xFFFF的字符） ??
//1.codePointAt codePointAt方法会正确返回四字节的UTF-16字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。
let string1 = '吉a';
console.log(string1.length);
console.log(string1.charAt(0));     //返回指定位置的字符
console.log(string1.charCodeAt(0)); //返回字符编码
console.log(string1.codePointAt(0));
console.log(string1.charAt(1));
console.log(string1.charCodeAt(1));
console.log(string1.codePointAt(1));

function is32Bit(c) {
    return console.log(c.codePointAt(0) > 0xFFFF);
}

is32Bit("𠮷");  // true
is32Bit("a"); // false

//2.String.fromCodePoint() 返回码点对应的字符 ES5提供String.fromCharCode
console.log(String.fromCharCode(0x20BB7));
console.log(String.fromCodePoint(0x20BB7));

//3.at() 字符串给定位置的字符 es5 charAt
console.log('激励'.charAt(0));
// console.log('𠮷'.at(0));  //

//4.字符的Unicode表示法
// (JavaScript允许采用“\uxxxx”形式表示一个字符，其中“xxxx”表示字符的码点。)
// 但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。
// ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
console.log(('吉'.charCodeAt(0)).toString(16));
console.log(parseInt('吉'.codePointAt(0),10).toString(16));
console.log("\u0061");  //a
console.log("\u20BB7"); //口7
console.log("\uD842\uDFB7"); //吉
console.log("\u{20BB7}"); //吉


//5.正则表达式的u修饰符
//点（.）字符在正则表达式中，解释为除了换行以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。
let s = "𠮷";
console.log(/^.$/.test(s)); // false
console.log(/^.$/u.test(s)); // true

//Unicode字符表示法(??)
//ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别。
console.log(/\u{61}/u.test('a'));       //true
console.log(/\u{20BB7}/u.test('吉'));    //false

//量词(??)
console.log(/a{2}/.test('aa')); //true
console.log(/吉{2}/.test('吉吉'));//true



//6.省略
//7.includes(),startsWith(),endsWith()
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
// 第二个参数支持从哪个地方开始搜索

let string2 = '今天很开心';
console.log(string2.includes('很'));
console.log(string2.startsWith('今天'));
console.log(string2.endsWith('开心'));


//8.repeat()
// 返回一个新字符串，将元字符串重复几次
console.log('hello'.repeat(2));

//9.正则表达式的y修饰符
//y修饰符必须从剩余的第一个位置开始匹配，不能就是null
let string3 = 'aaa_aa_a';
let r1 = /a+/g;
let r2 = /a+/gy;
console.log(r1.exec(string3)); // ["aaa"]
console.log(r2.exec(string3)); // ["aaa"]
console.log(r1.exec(string3)); // ["aa"]
console.log(r2.exec(string3)); // null

//10.模板字符串 ------ (`)符号

let [a,b]=[1,2];
console.log(`${a} + ${b} = ${a+b}`);

















































