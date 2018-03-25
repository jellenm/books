
var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];

var o = [for (year of years) if (year > 2000) year];

return
let array = [];
function testArr(arr,...args){
	let o= [for (item of args) if(item > 3) item];
}
testArr(array,1,2,3,4,5);