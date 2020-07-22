let canvas,
	c,
	icube;

let mouse = {
	x: 0,
	y: 0
};

let t = Math.PI*60;

window.onload = e => 
{
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	
	canvas = document.querySelector("canvas");
	c = canvas.getContext("2d");

	icube = new ImpossibleCube(
		new Vector3(1, 1, 1),
		new Vector3(0, 0, 1.7),
		.2
	);

	// icube = new Block(
	// 	new Vector3(1, 1, 1),
	// 	new Vector3(0, 0, 1.5),
	// );

	// icube.rotateY(Math.PI/8);
	// icube.rotateX(Math.PI/10);
	// icube.rotateZ(Math.PI/12);

	canvas.width = 1000;
	canvas.height = 1000;
	c.lineWidth = 1;

	draw();
	setInterval(draw, 16);
};

window.onmousemove = e => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
};

function draw()
{
	c.clearRect(0, 0, canvas.width, canvas.height);

	c.strokeStyle = "#999";

	icube.draw(c);

	// icube.rotateY(Math.PI/300 * (Math.sin(t/30))); //icube.rotateY(Math.PI/200 * (Math.sin(t/30)-1));
	// icube.rotateX(Math.PI/1000 * (Math.sin(t/120)));

	icube.rotateY(Math.PI/200);
	icube.rotateX(Math.PI/300);
	icube.rotateZ(Math.PI/800);

	// c.beginPath();
	// c.moveTo(100, 100);
	// c.lineTo(120, 150);
	// c.lineTo(100, 150);
	// c.fill();

	// icube.rotateZ(Math.PI/12);

	t++;
}