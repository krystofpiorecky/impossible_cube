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

		let virtual_sides = [
			{
				replace_point: 3,
				side: this.blocks[2].sides[3],
				iside: this.blocks[7].sides[1],
				point_numbers: [3, 2, 3, 0]
			},
			{
				replace_point: 3,
				side: this.blocks[2].sides[4],
				iside: this.blocks[11].sides[3],
				point_numbers: [3, 2, 1, 2]
			},
			{
				replace_point: 1,
				side: this.blocks[6].sides[0],
				iside: this.blocks[3].sides[4],
				point_numbers: [1, 2, 3, 2]
			},
			{
				replace_point: 1,
				side: this.blocks[6].sides[4],
				iside: this.blocks[9].sides[0],
				point_numbers: [1, 2, 3, 2]
			},
			{
				replace_point: 1,
				side: this.blocks[10].sides[3],
				iside: this.blocks[5].sides[0],
				point_numbers: [1, 2, 1, 2]
			},
			{
				replace_point: 3,
				side: this.blocks[10].sides[0],
				iside: this.blocks[1].sides[3],
				point_numbers: [3, 2, 3, 2]
			}
		]

		this.sides = this.sides.sort(
			(a, b) => a.distance > b.distance ? -1 : 1
		);

		// draw sides
		this.sides.concat(
			virtual_sides.map(
				v => {
					let points = [null, null, null, null];

					points[v.replace_point] = Vector2.intersection(
						v.side.points[v.point_numbers[0]].toVector2(), 
						v.side.points[v.point_numbers[1]].toVector2(), 
						v.iside.points[v.point_numbers[2]].toVector2(), 
						v.iside.points[v.point_numbers[3]].toVector2()
					).center(screen_size);

					return new VirtualSide(
						points,
						v.side
					);
				}
			)
		).forEach(
			side => side.draw(_canvas)
		);
	}

	createSides()
	{
		let hidden = [
			[0,1], [0,1], [0,1], [0,1],
			[2,3], [2,3], [2,3], [2,3],
			[4,5], [4,5], [4,5], [4,5],

			[1,2,5], [0,2,5], [1,3,5], [0,3,5],
			[1,2,4], [0,2,4], [1,3,4], [0,3,4]
		];

		this.sides = [];

		this.blocks.forEach(
			(block, blockIndex) => 
			block.sides.forEach(
				(side, sideIndex) => 
				{
					if(hidden[blockIndex].indexOf(sideIndex) === -1)
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
		let f = 0.001; // fill line space

		let sizes = [
			new Vector3(x, 0, 0).add(new Vector3(-w, w, w)).add(new Vector3(f, 0, 0)), 
			new Vector3(0, y, 0).add(new Vector3(w, -w, w)).add(new Vector3(0, f, 0)), 
			new Vector3(0, 0, z).add(new Vector3(w, w, -w)).add(new Vector3(0, 0, f)), 
			new Vector3(w, w, w), 
			new Vector3(w, w, w)
		];

		x /= 2; y /= 2; z /= 2;

		let dist = [
			new Vector3(0, -y, -z), new Vector3(0, y, -z), new Vector3(0, y, z), new Vector3(0, -y, z),
			new Vector3(-x, 0, -z), new Vector3(x, 0, -z), new Vector3(x, 0, z), new Vector3(-x, 0, z),
			new Vector3(-x, -y, 0), new Vector3(x, -y, 0), new Vector3(x, y, 0), new Vector3(-x, y, 0),
			
			new Vector3(-x, -y, -z), new Vector3(x, -y, -z), new Vector3(-x, y, -z), new Vector3(x, y, -z),
			new Vector3(-x, -y, z), new Vector3(x, -y, z), new Vector3(-x, y, z), new Vector3(x, y, z)
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