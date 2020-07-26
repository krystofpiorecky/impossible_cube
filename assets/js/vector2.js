class Vector2
{
	constructor(_x, _y)
	{
		this.x = _x;
		this.y = _y;
	}

	draw(_canvas)
	{
		_canvas.beginPath();
		_canvas.moveTo(this.x-10, this.y-10);
		_canvas.lineTo(this.x+10, this.y+10);
		_canvas.stroke();

		_canvas.beginPath();
		_canvas.moveTo(this.x+10, this.y-10);
		_canvas.lineTo(this.x-10, this.y+10);
		_canvas.stroke();
	}

	from(_vector2)
	{
		this.x = _vector2.x;
		this.y = _vector2.y;

		return this;
	}

	copy()
	{
		return new Vector2()
			.from(this);
	}

	center(_vector2)
	{
		return this.translate(
			new Vector2(
				_vector2.x/2,
				_vector2.y/2
			)
		);
	}

	modify(_function)
	{
		return this.from(_function(this));
	}

	modifyEach(_function)
	{
		return this.modify(
			({x, y}) => 
			new Vector3(
				_function(x),
				_function(y)
			)
		);
	}

	add(_vector2)
	{
		this.x += _vector2.x;
		this.y += _vector2.y;

		return this;
	}

	subtract(_vector2)
	{
		this.x -= _vector2.x;
		this.y -= _vector2.y;

		return this;
	}

	translate(_vector2)
	{
		return this.copy()
			.add(_vector2);
	}
	
	length()
	{
		return Math.sqrt(
			Math.pow(this.x, 2) +
			Math.pow(this.y, 2)
		);
	}

	static intersection(_p11, _p12, _p21, _p22)
	{	
		let d = ((_p22.y - _p21.y) * (_p12.x - _p11.x)) - ((_p22.x - _p21.x) * (_p12.y - _p11.y));
		if (d === 0) return new Vector2(0, 0);

		let a = _p11.y - _p21.y;
		let b = _p11.x - _p21.x;
		a = (((_p22.x - _p21.x) * a) - ((_p22.y - _p21.y) * b)) / d;
		b = (((_p12.x - _p11.x) * a) - ((_p12.y - _p11.y) * b)) / d;

		return new Vector2(
			_p11.x + (a * (_p12.x - _p11.x)), 
			_p11.y + (a * (_p12.y - _p11.y))
		);
	}
}