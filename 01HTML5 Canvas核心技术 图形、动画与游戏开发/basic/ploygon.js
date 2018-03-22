window.Ploygon = function(startAngle,sides,radius,pos){
	this.startAngle = startAngle;
	this.sides = sides;
	this.radius = radius;
	this.pos = pos;
	this.points=[];
}
Ploygon.prototype = {
	getPoints(){
		let self = this,
			per_angle = 360/this.sides;
		this.points = [];
		for(let i=0;i<this.sides;i++){
			let angle = Math.PI*i*per_angle/180;
			this.points.push({x:this.radius*Math.cos(angle)+this.pos.x,y:this.radius*Math.sin(angle)+this.pos.y});
		}
	
	},
	createPath(context){
		context.beginPath();
		context.moveTo(this.points[0]['x'],this.points[0]['y']);
		for(let i=1;i<this.points.length;i++){
			context.lineTo(this.points[i]['x'],this.points[i]['y']);
		}
		context.closePath();
	},
	fill(context){
		this.getPoints();
		this.createPath(context);
		context.save();
		context.fillStyle = '#4d77f0';
		context.fill();
		context.restore();
	}
}
