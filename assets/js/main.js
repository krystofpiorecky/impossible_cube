let canvas,
	c,
	icube;

let mouse = {
	x: 0,
	y: 0
}

window.onload = e => 
{
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	
	canvas = document.querySelector("canvas");
	c = canvas.getContext("2d");

	icube = new ImpossibleCube(
		new Vector3(1, 1, 1),
		new Vector3(0, 0, 1.3),
		.05
	);

	icube.rotateY(Math.PI/4);
	// icube.rotateX(Math.PI/10);
	// icube.rotateZ(Math.PI/12);

	canvas.width = 1000;
	canvas.height = 1000;
	c.fillStyle = "#fff";
	c.lineWidth = 3;

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

	icube.rotateY(Math.PI/200);
	icube.rotateX(Math.PI/300);
	// icube.rotateZ(Math.PI/12);
}