const skyPng = require('../../image/sky.png');
let WIDTH,HEIGHT,
	canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
let skyImage = new Image(),
	scrollX=0,
	distance = 30,
	lastTime = +(new Date());
skyImage.onload = function(){
	canvas.width = WIDTH = skyImage.width;
	canvas.height = HEIGHT = skyImage.height;
	drawSky();
}
skyImage.src = skyPng;
function drawSky(){
	let interval = +(new Date) - lastTime;
	if(scrollX > WIDTH){ scrollX=0}
	scrollX += distance*interval/1000;
	context.clearRect(0,0,WIDTH,HEIGHT);
	context.save();
	context.translate(-scrollX,0);
	context.drawImage(skyImage,0,0,WIDTH,HEIGHT);
	context.drawImage(skyImage,WIDTH-2,0,WIDTH,HEIGHT);
	context.restore();
}

function animation(){
	drawSky();
	window.requestAnimationFrame(animation);
	lastTime = +(new Date());
}
animation();
