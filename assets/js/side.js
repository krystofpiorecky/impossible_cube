class Side
{
	constructor(_points, _facing_from)
	{
		this.hue = 50;
		this.facing_from = _facing_from;
		this.points = _points;
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
		return this.middle.length();
		// return new Vector2(this.middle.y, this.middle.z).length();
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
			.subtract(this.facing_from)
			.modify(v => {
				let l = v.length();
				return new Vector3(
					v.x / l,
					v.y / l,
					v.z / l
				);
			});
	}

	get color()
	{
		return "hsl(" + this.hue + ", 40%, " + (80-(25*this.facing.x+50)*0.8) + "%";
	}
}