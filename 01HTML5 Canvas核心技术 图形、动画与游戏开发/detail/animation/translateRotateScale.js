const WIDTH = 1000,HEIGHT=800;
let canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let sky = require('../../image/sky.png'),
	skyImage = new Image();
skyImage.onload = function(){
	context.drawImage(skyImage,0,0);
	let colors = ['#d874d4','#f00','#778cf7']
	context.strokeStyle = '#000000';
	/*------ translate start ------*/
	// context.save();
	// context.fillStyle = colors[0];
	// context.strokeRect(0,0,200,200);
	// context.fillRect(0,0,200,200);
	// context.restore();

	// context.save();
	// context.fillStyle = colors[1];
	// context.translate(100,100);
	// context.strokeRect(0,0,200,200);
	// context.fillRect(0,0,200,200);
	// context.restore();

	// context.save();
	// context.fillStyle = colors[2];
	// context.translate(-100,-100);
	// context.strokeRect(0,0,200,200);
	// context.fillRect(0,0,200,200);
	// context.restore();
	/*------ translate end------*/

	/*------ rotate start ------*/
	// context.save();
	// context.fillStyle = colors[0];
	// context.strokeRect(0,0,200,100);
	// context.fillRect(0,0,200,100);

	// context.save();
	// context.rotate(30*Math.PI/180);
	// context.fillStyle = colors[1];
	// context.strokeRect(0,0,200,100);
	// context.fillRect(0,0,200,100);

	// context.save();
	// context.rotate(-30*Math.PI/180);
	// context.fillStyle = colors[2];
	// context.strokeRect(0,0,200,100);
	// context.fillRect(0,0,200,100);
	/*------ rotate end ------*/

	/*------ scale start ------*/
	// context.save();
	// context.fillStyle = colors[0];
	// context.fillRect(0,0,200,100);
	// context.strokeRect(0,0,200,100);
	// context.restore();

	// context.save();
	// context.fillStyle = colors[1];
	// context.scale(0.5,0.5);
	// context.fillRect(0,0,200,100);
	// context.strokeRect(0,0,200,100);
	// context.restore();
	/*------ scale end ------*/


	let left = 300,
		top = 200,
		rotate=51,
		w=200,
		h=100;
	context.save();
	context.fillStyle = colors[0];
	context.translate(left,top);
	context.rotate(rotate*Math.PI/180);
	context.fillRect(-w/2,-h/2,w,h);
	context.strokeRect(-w/2,-h/2,w,h); 
	context.restore();

	context.save();
	context.arc(left,top,10,0,2*Math.PI,true);
	context.stroke();
	context.restore();

}
skyImage.src = sky;


