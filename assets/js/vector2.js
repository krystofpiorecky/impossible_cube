class Vector2
{
	constructor(_x, _y)
	{
		this.x = _x;
		this.y = _y;
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

	add(_vector2)
	{
		this.x += _vector2.x;
		this.y += _vector2.y;

		return this;
	}

	translate(_vector2)
	{
		return this.copy()
			.add(_vector2);
	}
}