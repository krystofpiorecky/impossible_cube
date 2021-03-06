let canvas,
	c,
	icube;

let mouse = {
	x: 0,
	y: 0
};

let last_mouse = {};

let t = Math.PI*60;
let spinning = true;
let mousedown = false;

window.onload = e => 
{
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	
	canvas = document.querySelector("canvas");
	c = canvas.getContext("2d");

	icube = new ImpossibleCube(
		new Vector3(1, 1, 1),
		new Vector3(0, 0, 100),
		.1
	);

	// icube = new ImpossibleCube(
	// 	new Vector3(10, 10, 10),
	// 	new Vector3(0, 0, 20),
	// 	5
	// );

	// icube = new Block(
	// 	new Vector3(1, 1, 1),
	// 	new Vector3(0, 0, 1.5),
	// );

	icube.rotateX(Math.PI/4);
	icube.rotateY(Math.PI/5);
	// icube.rotateZ(Math.PI/4);

	canvas.width = 1000;
	canvas.height = 1000;
	c.lineWidth = 4;

	draw();
	setInterval(draw, 16);
};

window.onmousemove = e => {

	if(mousedown)
	{
		icube.rotateX((e.clientX - mouse.x)/100);
		icube.rotateY((e.clientY - mouse.y)/100);
	}

	mouse.x = e.clientX;
	mouse.y = e.clientY;
};

window.onmousedown = e => {
	// spinning = false;
	// mousedown = true;

	// console.log(icube.rotation);


	// icube.rotateX(-icube.rotation.x);
	// icube.rotateY(-icube.rotation.y);
};

// window.onmouseup = e => {
// 	mousedown = false;
// 	spinning = true;
// };

function draw()
{
	c.clearRect(0, 0, canvas.width, canvas.height);

	c.strokeStyle = "#fff";

	icube.draw(c);

	if(spinning)
	{
		// icube.rotateY(-Math.PI/2000 * (Math.sin(t/30))); //icube.rotateY(Math.PI/200 * (Math.sin(t/30)-1));
		// icube.rotateX(Math.PI/2000 * (Math.cos(t/30)));

		// icube.rotateY(Math.PI/200);
		// icube.rotateX(Math.PI/300);
		// icube.rotateZ(Math.PI/800);


		// icube.rotateZ(Math.PI/12);
	}

	let screen = new Vector2(
		window.innerWidth,
		window.innerHeight
	);

	let amount = (distance) => {
		if(distance < 0) return -amount(-distance);
		return Math.pow(distance/100,1/2)/10;
	};

	if(last_mouse.x != undefined)
	{
		icube.rotateY(-amount(last_mouse.y-screen.y/2));
		icube.rotateX(-amount(last_mouse.x-screen.x/2));
	}

	if(mouse.x != undefined)
	{
		icube.rotateX(amount(mouse.x-screen.x/2));
		icube.rotateY(amount(mouse.y-screen.y/2));
	}

	last_mouse.x = mouse.x;
	last_mouse.y = mouse.y;

	t+=0.1;
}