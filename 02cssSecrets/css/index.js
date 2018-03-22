function makeSVG(tag, attrs) {
	var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs)
		el.setAttribute(k, attrs[k]);
	document.getElementById('s').appendChild(el);
}

function calcCenterPoint(arc, radius) {
	var standArc = 45;
	var centerPointArc = arc - standArc;
	var centerPointLine = radius / 2 / Math.cos(standArc * Math.PI / 180);
	var x = Math.cos(centerPointArc * Math.PI / 180) * centerPointLine;
	var y = Math.sin(centerPointArc * Math.PI / 180) * centerPointLine;
	return [x, y];
}

function createSvg() {
	var svgW = 500,
		svgH = 300;
	var svgData = [{
			name: 'data1',
		}, {
			name: 'data2',
		}, {
			name: 'data3',
		}, {
			name: 'data4',
		}, {
			name: 'data5',
		}, {
			name: 'data6',
		}],
		length = svgData.length;
	var origin = [svgW / 2, svgH / 2];
	var radius = Math.min(svgW / 2, svgH / 2) - 50;
	var arcPart = parseInt(360 / length);
	for (var i = 0; i < length; i++) {
		var currentArc = arcPart * i;
		var endPoint = [];
		endPoint[0] = radius * Math.cos(Math.PI * currentArc / 180);
		endPoint[1] = radius * Math.sin(Math.PI * currentArc / 180);
		var centerPoint = calcCenterPoint(currentArc, radius);
		var path = "M" + origin[0] + " " + origin[1] + " Q" + (centerPoint[0] + origin[0]) + " " + (centerPoint[1] + origin[1]) + " " + (endPoint[0] + origin[0]) + " " + (endPoint[1] + origin[1]);
		makeSVG("path", {
			"d": path,
			"stroke": "#000",
			"stroke-width": 2,
			"fill": "none"
		});
	}

}
createSvg();