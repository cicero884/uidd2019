function drawBackground(){
	var canvas = document.getElementById('circle');
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
	if (canvas.getContext)
	{
		var ctx = canvas.getContext('2d'); 
		var X = canvas.width / 1.7;
		var Y = 0;
		var R = (X+Y)/1.5;
		ctx.beginPath();
		ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
		ctx.lineWidth = Math.sqrt(X+Y)*3;
		ctx.strokeStyle = '#CCC';
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(300, 150);
		ctx.stroke();
		

		ctx.beginPath();
		ctx.arc(100, 200, 30, 0, 2 * Math.PI, false);
		ctx.fillStyle='#000';
		ctx.fill();
	}
}
