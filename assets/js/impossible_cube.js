class ImpossibleCube
{
	constructor(_size, _position, _block_width)
	{
		this.size = _size;
		this.position = _position;
		this.block_width = _block_width; 

		this.blocks = [];

		this.createBlocks();
	}

	draw(_canvas)
	{
		this.blocks.forEach(
			block => block.draw(_canvas)
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
			new Vector3(-0.5, -0.5, 0), new Vector3(0.5, -0.5, 0), new Vector3(0.5, 0.5, 0), new Vector3(-0.5, 0.5, 0)
		];

		let sizes = [
			new Vector3(x, 0, 0).add(new Vector3(w, w, w)), 
			new Vector3(0, y, 0).add(new Vector3(w, w, w)), 
			new Vector3(0, 0, z).add(new Vector3(w, w, w))
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