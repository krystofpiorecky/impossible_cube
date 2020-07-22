class Side
{
	constructor(_points, _facing_from)
	{
		this.facing_from = _facing_from;
		this.points = _points;
	}

	draw(_canvas)
	{
		let screen_size = new Vector2(
			_canvas.canvas.width,
			_canvas.canvas.height
		);

		// console.log( this.facing.y);
		let color = "hsl(40, 80%, " + (80-(500*this.facing.y+50)*0.8) + "%";
			// "rgba(" + Math.floor(Math.random()*255) + 
			// "," + Math.floor(Math.random()*255) + 
			// "," + Math.floor(Math.random()*255) + ",1)";

		let first = true;

		_canvas.fillStyle = color;

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

		let middle = this.points[0]
			.copy()
			.subtract({
				x: (this.points[0].x - this.points[2].x) / 2,
				y: (this.points[0].y - this.points[2].y) / 2,
				z: (this.points[0].z - this.points[2].z) / 2
			});
		
		// let {x, y} = middle
		// 	.toVector2()
		// 	.center(screen_size);
		// _canvas.arc(x, y, 20, 0, 2 * Math.PI); 

		_canvas.fill();
		
		// let middle = this.middle
		// 	.toVector2()
		// 	.center(screen_size);
		// let facing = this.middle
		// 	.add(this.facing)
		// 	.toVector2()
		// 	.center(screen_size);

		// _canvas.beginPath();
		// _canvas.moveTo(middle.x, middle.y);
		// _canvas.lineTo(facing.x, facing.y);
		// _canvas.stroke();
	}

	get distance()
	{
		const {x, y, z} = this.middle;

		return Math.sqrt(
			Math.pow(x, 2) +
			Math.pow(y, 2) +
			Math.pow(z, 2)
		);
	}

	get middle()
	{
		return this.points[0]
			.copy()
			.subtract({
				x: (this.points[0].x - this.points[2].x) / 2,
				y: (this.points[0].y - this.points[2].y) / 2,
				z: (this.points[0].z - this.points[2].z) / 2
			});
	}

	get facing()
	{
		return this.middle
			.subtract(this.facing_from);
	}
}