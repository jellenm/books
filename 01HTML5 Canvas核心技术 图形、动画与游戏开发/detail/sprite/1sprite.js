const WIDTH = 800,
	HEIGHT = 800;
let canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let spritPaint = {
	paint(sprite,context){
		let w = sprite.width,
			l = sprite.left,
			t = sprite.top,
			r = w/2;
		context.save();
		context.beginPath();
		context.strokeStyle = '#000';
		context.moveTo(WIDTH/2,HEIGHT/2);
		context.lineTo(l,t);
		context.stroke();

		context.save();
		context.beginPath();
		context.arc(l,t,r,0,2*Math.PI,false);
		context.clip();

		context.shadowColor = 'rgb(0,0,0)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;

        context.lineWidth = 2;
        context.strokeStyle = 'rgb(100,100,195)';
        context.fillStyle = 'rgba(30,144,255,0.15)';
        context.fill();
        context.stroke();
        context.restore();
	}
},
ballSprite = new Sprite('circle',spritPaint);
function paintClock(){
	let current = new Date(),
		hour = current.getHours(),
		second = current.getSeconds(),
		min = current.getMinutes(),
		x,y,angle;	

	context.clearRect(0,0,WIDTH,HEIGHT);
	grid(WIDTH/2-200,20,20);

	//时
	angle = (hour * 360/12 -90 + min*360/12/60 )*Math.PI/180;
	x = WIDTH/2 + Math.cos(-angle)*(WIDTH/2-200);
	y = HEIGHT/2 - Math.sin(-angle)*(WIDTH/2-200);
	ballSprite.top = y;
	ballSprite.left = x;
	ballSprite.width = 60;
	
	ballSprite.paint(context);

	//分
	angle = (min * 360/60 -90 + second*360/60/60 )*Math.PI/180;
	x = WIDTH/2 + Math.cos(-angle)*(WIDTH/2-200);
	y = HEIGHT/2 - Math.sin(-angle)*(WIDTH/2-200);
	ballSprite.top = y;
	ballSprite.left = x;
	ballSprite.width = 40;
	ballSprite.paint(context);

	//秒
	angle = (second * 360/60 -90)*Math.PI/180;
	x = WIDTH/2 + Math.cos(-angle)*(WIDTH/2-200);
	y = HEIGHT/2 - Math.sin(-angle)*(WIDTH/2-200);
	ballSprite.top = y;
	ballSprite.left = x;
	ballSprite.width = 20;
	ballSprite.paint(context);
}

function grid(radius,stepx,stepy){


	

	context.save()
   context.shadowColor = undefined;
   context.shadowBlur = 0;
   context.shadowOffsetX = 0;
   context.shadowOffsetY = 0;
   
   context.strokeStyle = 'lightgray';
   context.fillStyle = '#ffffff';
   context.lineWidth = 0.5;
   context.fillRect(0, 0, context.canvas.width, context.canvas.height);

   for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
     context.beginPath();
     context.moveTo(i, 0);
     context.lineTo(i, context.canvas.height);
     context.stroke();
   }

   for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
     context.beginPath();
     context.moveTo(0, i);
     context.lineTo(context.canvas.width, i);
     context.stroke();
   }

   context.restore();


   	context.beginPath();
	context.arc(WIDTH/2,HEIGHT/2,radius,0,2*Math.PI,true);
	context.closePath();
	context.strokeStyle = '#000';
	context.stroke();
}



function animating(){
	paintClock();
	requestNextAnimationFrame(animating);
}

requestNextAnimationFrame(animating);
