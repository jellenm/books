const WIDTH = 1000,HEIGHT = 300;
let canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
let copycanvas = document.createElement('canvas'),
	copycontext = copycanvas.getContext('2d');
let imageData,
	mousedownFlag,
	mousedownPos={},
	scale = 3;
canvas.width = WIDTH;
canvas.height = HEIGHT;
copycanvas.width = WIDTH*scale;
copycanvas.height = HEIGHT*scale;

let Glass = function(pos,radius){
	this.x = pos.x;
	this.y = pos.y;
	this.radius = radius;
}
Glass.prototype = {
	draw(context,pos) {
		context.clearRect(0,0,WIDTH,HEIGHT);
		// context.drawImage(image,0,0,image.width,image.height,0,0,WIDTH,HEIGHT);
		context.putImageData(imageData,0,0,0,0,WIDTH,HEIGHT);
		context.save();
		context.beginPath();
		if(pos){
			this.x = pos.x;
			this.y = pos.y;
		}
		context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
		context.fillStyle = '#000000';
		context.stroke();
		context.clip();
		context.drawImage(copycanvas,(scale-1)*pos.x,(scale-1)*pos.y,WIDTH,HEIGHT,0,0,WIDTH,HEIGHT);
		context.restore();
	}
}

let glass = new Glass({x:600,y:100},100);
let image = new Image();
image.src = './detail.jpg';
image.onload = function(){
	context.drawImage(image,0,0,image.width,image.height,0,0,WIDTH,HEIGHT);
	imageData = context.getImageData(0,0,WIDTH,HEIGHT);
	console.log('iamgeData',imageData)
	copycontext.drawImage(image,0,0,image.width,image.height,0,0,WIDTH*scale,HEIGHT*scale);
	glass.draw(context,{x:300,y:100});
}

function posToCanvas(pos){
	let canvasPos = canvas.getBoundingClientRect(),x,y;
	x = pos.x - canvasPos.left;
	y = pos.y - canvasPos.top;
	return {x,y}
}
function mousedownEve(e){
	if(e.target.tagName == 'CANVAS'){
		mousedownFlag = true;
		mousedownPos = posToCanvas({x:e.pageX,y:e.pageY});
		glass.draw(context,mousedownPos);
	}
}
function mousemoveEve(e){
	if(mousedownFlag){
		glass.draw(context,posToCanvas({x:e.pageX,y:e.pageY}));
	}
}
function mouseupEve(e){
	if(mousedownFlag){
		mousedownFlag =false;
	}
}
document.addEventListener('mousedown',mousedownEve,false);
document.addEventListener('mousemove',mousemoveEve,false);
document.addEventListener('mouseup',mouseupEve,false);