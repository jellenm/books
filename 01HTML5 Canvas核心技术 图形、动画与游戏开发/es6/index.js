/*
	chunk 利用Array.from 将一个一维数组 改为以size为单位的二维数组
 */
const chunk = (arr,size) => Array.from({length:Math.ceil(arr.length/size)},(v,i)=>arr.slice(i*size,(i+1)*size));
console.log('chunk',chunk([1,2,3,4,5],2));

/*
	compact 利用Array.filter，返回符合条件的数值，形成新数组
 */
const compact = arr=> arr.filter(Boolean); //compact = arr=> arr.filter( (v,i)=> v>1 ) 
console.log('compact',compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]));

/*
	countOccurrences 数组内等于某个值的个数
 */
const countOccurrences = (arr,num)=>arr.reduce((p,n)=>(n==num)?p+=1:p+=0,0);
console.log('countOccurrences',countOccurrences([1,2,1,11],1));

/*
	deepFlatten 将二维数组遍历成一维数组
 */
const deepFlatten = arr => [].concat(...arr.map((v,i)=>Array.isArray(v)?deepFlatten(v):v));
// const deepFlatten = arr => [].concat(...arr.map((v,i)=>{ return Array.isArray(v)?deepFlatten(v):v}));
console.log('deepFlatten',deepFlatten([1,[2,3],4]));


/*
	difference 两个数组间的不同(b不同于a的)
 */
const difference = (a,b) => {
	let s = new Set(a);
	return b.filter( v=>!s.has(v));
}
console.log('difference',difference([1,2,3,4,5],[2,3,8,7]));


/*
	differenceWith 找出连个数组中前一个数组的round 后面数组是没有的的数值
 */
const differenceWith = (arr,val,comp)=>arr.filter(a=>val.findIndex(b=>comp(a,b)) === -1);
console.log('differenceWith',differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)));


/*
	数组中没有重复的数值
 */
const filterNonUnique = arr => arr.filter(v=>arr.indexOf(v)===arr.lastIndexOf(v));
console.log('filterNonUnique',filterNonUnique([1,2,3,4,5,6,4]));