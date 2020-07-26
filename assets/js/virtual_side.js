class VirtualSide
{
	constructor(_points, _side)
	{
		this.side = _side;
		this.points = _points;
	}

	draw(_canvas)
	{
		let screen_size = new Vector2(
			_canvas.canvas.width,
			_canvas.canvas.height
		);

		let first = true;

		// this.side.hue += 180;
		_canvas.fillStyle = this.side.color;
		// this.side.hue -= 180;

		_canvas.beginPath();

		this.points
			.map((p, index) => {
				if(p == null) return this.side.points[index].toVector2().center(screen_size);
				return p;
			})
			.forEach(point => {
				let {x, y} = point;

				if(first)
				{
					_canvas.moveTo(x, y);
					first = false;
				}
				else 
					_canvas.lineTo(x, y);
			});

		_canvas.fill();
	}

	get facing()
	{
		return this.side.facing;
	}
}