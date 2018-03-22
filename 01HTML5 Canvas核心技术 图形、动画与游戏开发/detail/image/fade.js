const WIDTH=800,HEIGHT=300;
let canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	fadeInBtn = document.getElementById('fadeIn'),
	fadeOutBtn = document.getElementById('fadeOut'),
	fadeEle = document.getElementsByName('fade'),
	imageData,
	opacity=1,
	step=100,
	timg,
	worker = new Worker('./worker.js');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let image = new Image();
image.onload = function(){
	context.drawImage(image,0,0,WIDTH,HEIGHT);
	imageData = context.getImageData(0,0,WIDTH,HEIGHT);
}
image.src = './detail.jpg';

function fade(out){
	let nowStep = 0;
	if(timg){ clearInterval(timg)}
	timg = setInterval(()=>{
		nowStep++;
		if(nowStep < step){
			if(out){
				var now = 1-nowStep/step;
			}else{
				var now = nowStep/step;
			}
			worker.postMessage({data:imageData,step:now});
			worker.onmessage = function(e){
				let data = e.data;
				context.putImageData(data,0,0,0,0,WIDTH,HEIGHT);
			}
		}else{
			clearInterval(timg);
			if(out){
				var now = 0;
			}else{
				var now = 1;
			}
			worker.postMessage({data:imageData,step:now});
			worker.onmessage = function(e){
				let data = e.data;
				context.putImageData(data,0,0,0,0,WIDTH,HEIGHT);
			}
		}
	},10)
}

fadeInBtn.onchange=function(){
	fade();
}
fadeOutBtn.onchange = function(){
	fade('out');
}
