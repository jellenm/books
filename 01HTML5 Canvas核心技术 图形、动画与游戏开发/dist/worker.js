onmessage = function(e){
	let data = e.data.data;
	let opacity = e.data.step;
	for(let i=0;i<data.data.length;i+=4){
		data.data[i+3] = data.data[i+3]*opacity;
	}
	postMessage(data);
}