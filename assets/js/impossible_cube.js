class ImpossibleCube
{
	constructor(_size, _position, _block_width)
	{
		this.size = _size;
		this.position = _position;
		this.block_width = _block_width; 

		this.blocks = [];

		this.createBlocks();
		this.createSides();
	}

	draw(_canvas)
	{
		let screen_size = new Vector2(
			_canvas.canvas.width,
			_canvas.canvas.height
		);

		this.blocks.forEach(
			block => block.draw(_canvas)
		);

		// let outer = [
		// 	[], [], [], [],
		// 	[], [], [], [],
		// 	[], [], [], [],

		// 	[4], [4], [4], [4],
		// 	[], [], [], []
		// ];

		// let colors = [
		// 	"#f2c855",
		// 	"#a38021",
		// 	"#cca439",
		// 	"#cca439",
		// 	"#ba942f"
		// ];

		this.sides = this.sides.sort(
			(a, b) => a.distance > b.distance ? -1 : 1
		);

		this.sides.forEach(
			side => side.draw(_canvas)
		);

		// shapes.forEach(
		// 	(shape, index) => {
		// 		_canvas.fillStyle = colors[index];
				
		// 		let first = true;
		// 		shape.forEach(([block, point]) => {
		// 			let {x, y} = this
		// 				.blocks[block]
		// 				.points[point]
		// 				.toVector2()
		// 				.center(screen_size);

		// 			if(first)
		// 			{
		// 				_canvas.moveTo(x, y);
		// 				first = false;
		// 			}
		// 			else 
		// 				_canvas.lineTo(x, y);
		// 		});
		// 		_canvas.fill();
		// 	}
		// );

	}

	createSides()
	{
		// let outer = [
		// 	[2,3,4,5], [4], [4], [4],
		// 	[4], [4], [], [],
		// 	[], [], [], [],

		// 	[4], [4], [4], [4],
		// 	[], [], [], []
		// ];

		this.sides = [];

		this.blocks.forEach(
			(block, blockIndex) => 
			block.sides.forEach(
				(side, sideIndex) => 
				{
					this.sides.push(side);
				}
			)
		);
	}

	createBlocks()
	{
		this.blocks = [];

		let {x, y, z} = this.size;
		let w = this.block_width;

		let dist = [
			new Vector3(0, -0.5, -0.5), new Vector3(0, 0.5, -0.5), new Vector3(0, 0.5, 0.5), new Vector3(0, -0.5, 0.5),
			new Vector3(-0.5, 0, -0.5), new Vector3(0.5, 0, -0.5), new Vector3(0.5, 0, 0.5), new Vector3(-0.5, 0, 0.5),
			new Vector3(-0.5, -0.5, 0), new Vector3(0.5, -0.5, 0), new Vector3(0.5, 0.5, 0), new Vector3(-0.5, 0.5, 0),
			
			new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, -0.5, -0.5), new Vector3(-0.5, 0.5, -0.5), new Vector3(0.5, 0.5, -0.5),
			new Vector3(-0.5, -0.5, 0.5), new Vector3(0.5, -0.5, 0.5), new Vector3(-0.5, 0.5, 0.5), new Vector3(0.5, 0.5, 0.5)
		];

		let sizes = [
			new Vector3(x, 0, 0).add(new Vector3(-w, w, w)), 
			new Vector3(0, y, 0).add(new Vector3(w, -w, w)), 
			new Vector3(0, 0, z).add(new Vector3(w, w, -w)), 
			new Vector3(w, w, w), 
			new Vector3(w, w, w)
		];

		for(let i = 0; i < dist.length; i++)
		{
			this.blocks.push(
				new Block(
					sizes[Math.floor(i/4)],
					this.position.translate(dist[i])
				)
			);
		}
	}
	
	rotateAnchorX(_angle, _anchor)
	{
		this.blocks = this.blocks.map(
			p => p.rotateAnchorX(_angle, _anchor)
		);

		return this;
	}

	rotateAnchorY(_angle, _anchor)
	{
		this.blocks = this.blocks.map(
			p => p.rotateAnchorY(_angle, _anchor)
		);

		return this;
	}

	rotateAnchorZ(_angle, _anchor)
	{
		this.blocks = this.blocks.map(
			p => p.rotateAnchorZ(_angle, _anchor)
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