class Block
{
	constructor(_size, _position)
	{
		this.size = _size;
		this.position = _position;

		this.points = [];

		this.createPoints();
	}

	createPoints()
	{
		this.points = [];

		let {x, y, z} = this.size;

		let dist = [
			new Vector3(-x, -y, -z), new Vector3(x, -y, -z), 
			new Vector3(-x, y, -z), new Vector3(x, y, -z),
			new Vector3(-x, -y, z), new Vector3(x, -y, z), 
			new Vector3(-x, y, z), new Vector3(x, y, z)
		];

		for(let i = 0; i < 8; i++)
		{
			this.points.push(
				new Vector3(
					this.position.x + dist[i].x/2,
					this.position.y + dist[i].y/2,
					this.position.z + dist[i].z/2
				)
			);
		}
	}

	draw(_canvas)
	{
		const line = (_x1, _y1, _x2, _y2) => {
			_canvas.beginPath();
			_canvas.moveTo(_x1, _y1);
			_canvas.lineTo(_x2, _y2);
			_canvas.stroke(); 
		};
		
		let lines = [
			[0, 1], [0, 2], [0, 4], [7, 6], 
			[7, 5], [7, 3], [1, 3], [1, 5], 
			[6, 4], [6, 2], [2, 3], [5, 4]
		];

		let screen_size = new Vector2(
			_canvas.canvas.width,
			_canvas.canvas.height
		);

		let points = this.points.map(
			p => p.toVector2().center(screen_size)
		);

		for(let i = 0; i < 12; i++)
		{
			line(
				points[lines[i][0]].x,
				points[lines[i][0]].y,
				points[lines[i][1]].x,
				points[lines[i][1]].y
			);
		}
	}

	rotateAnchorX(_angle, _anchor)
	{
		this.points = this.points.map(
			p => p.rotateX(_angle, _anchor)
		);

		return this;
	}

	rotateAnchorY(_angle, _anchor)
	{
		this.points = this.points.map(
			p => p.rotateY(_angle, _anchor)
		);

		return this;
	}

	rotateAnchorZ(_angle, _anchor)
	{
		this.points = this.points.map(
			p => p.rotateZ(_angle, _anchor)
		);

		return this;
	}

	rotateX(_angle)
	{
		return this.rotateAnchorX(_angle, this.position);
	}

	rotateY(_angle)
	{
		return this.rotateAnchorY(_angle, this.position);
	}

	rotateZ(_angle)
	{
		return this.rotateAnchorY(_angle, this.position);
	}
}