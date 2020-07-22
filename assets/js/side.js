class Side
{
	constructor(_points, _position)
	{
		this.points = _points;
		this.color = 
			"rgba(" + Math.floor(Math.random()*255) + 
			"," + Math.floor(Math.random()*255) + 
			"," + Math.floor(Math.random()*255) + ",1)";
	}

	draw(_canvas)
	{
		let screen_size = new Vector2(
			_canvas.canvas.width,
			_canvas.canvas.height
		);

		let first = true;

		_canvas.fillStyle = this.color;

		_canvas.beginPath();

		this.points.forEach(point => {
			let {x, y} = point
				.toVector2()
				.center(screen_size);

			if(first)
			{
				_canvas.moveTo(x, y);
				first = false;
			}
			else 
				_canvas.lineTo(x, y);
		});

		// let middle = this.points[0]
		// 	.copy()
		// 	.subtract({
		// 		x: (this.points[0].x - this.points[2].x) / 2,
		// 		y: (this.points[0].y - this.points[2].y) / 2,
		// 		z: (this.points[0].z - this.points[2].z) / 2
		// 	});
		
		// let {x, y} = middle
		// 	.toVector2()
		// 	.center(screen_size);
		// _canvas.arc(x, y, 20, 0, 2 * Math.PI); 

		_canvas.fill();
	}

	get distance()
	{
		const {x, y, z} = this.points[0]
			.copy()
			.subtract({
				x: (this.points[0].x - this.points[2].x) / 2,
				y: (this.points[0].y - this.points[2].y) / 2,
				z: (this.points[0].z - this.points[2].z) / 2
			});

		return Math.sqrt(
			Math.pow(x, 2) +
			Math.pow(y, 2) +
			Math.pow(z, 2)
		);
	}
}