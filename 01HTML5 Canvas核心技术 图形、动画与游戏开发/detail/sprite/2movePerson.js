const WIDTH=500,
	HEIGHT = 300;
let canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let cells = [
		{left:0,top:0, width: 48, height: 64},
		{left:54,top:0, width: 48, height: 64},
		{left:105,top:0, width: 42, height: 64},
		{left:152,top:0, width: 46, height: 64},
		{left:203,top:0, width: 55, height: 64},
		{left:262,top:0, width: 50, height: 64},
		{left:318,top:0, width: 49, height: 64},
		{left:372,top:0, width: 46, height: 64},
		{left:423,top:0, width: 37, height: 64}
	],
	velocityX=100,
	spriteTop=100,
	spriteMove = {
		lastTime:0,
		execute(sprite,context,time){
			sprite.left -= sprite.velocityX*(time-this.lastTime)/1000;
			sprite.top = spriteTop;
			if(sprite.left<0){
				sprite.left = WIDTH;
			}
			this.lastTime = time;
		}
	},
	sheetMove = {
		interval:100,
		lastTime:0,
		execute(sprite,context,time){
			if((time - this.lastTime)>this.interval){
				sprite.painter.advance();
				this.lastTime = time;
			}
		}
	},
	spriteImage = new Image(),
	spriteWidth,spriteHeight,
	sprite = new Sprite('sprite',new SpriteSheetPainter(cells),[spriteMove,sheetMove]);


function drawBg(){
	let splite=20;
	for(let i=0.5+splite;i<HEIGHT;i+=splite){
		context.beginPath();
		context.moveTo(0,i);
		context.lineTo(WIDTH,i);
		context.strokeStyle = '#cccccc';
		context.lineWidth = 0.5;
		context.stroke();
	}
	context.drawImage(spriteImage,0,0);
}


function animate(time){
	context.clearRect(0,0,WIDTH,HEIGHT);
	drawBg();
	sprite.update(context,time);
	sprite.paint(context);
	window.requestNextAnimationFrame(animate);
}


spriteImage.onload = function(){
	spriteWidth = spriteImage.width;
	spriteHeight = spriteImage.height;
	window.spritesheet = spriteImage;
	sprite.top = spriteTop;
	sprite.left = spriteTop;
	sprite.velocityX = velocityX;
	drawBg();
	requestNextAnimationFrame(animate);
}
spriteImage.src='./running-sprite-sheet.png';




