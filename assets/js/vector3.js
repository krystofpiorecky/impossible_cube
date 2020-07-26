class Vector3
{
	constructor(_x, _y, _z)
	{
		this.x = _x;
		this.y = _y;
		this.z = _z;
	}

	from(_vector3)
	{
		this.x = _vector3.x;
		this.y = _vector3.y;
		this.z = _vector3.z;

		return this;
	}

	copy()
	{
		return new Vector3()
			.from(this);
	}

	toVector2()
	{
		let x = this.x;
		let y = this.y; 
		let z = this.z;
		let distance;
		let angle;
		
		distance = Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
		angle = Math.atan2(z, x);
		
		x = distance * Math.cos(angle);
		z = distance * Math.sin(angle);
		
		distance = Math.sqrt(Math.pow(y,2) + Math.pow(z,2));
		angle = Math.atan2(z, y);
		
		y = distance * Math.cos(angle);
		z = distance * Math.sin(angle);
		
		let zoom = 100;

		return new Vector2(
			x * 500 / z * zoom, 
			y * 500 / z * zoom
		);
	}

	rotateX(_angle, _anchor)
	{
		this.subtract(_anchor);

		let distance = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.z,2));
		let angle = Math.atan2(this.z, this.x);
		
		this.x = distance * Math.cos(angle + _angle);
		this.z = distance * Math.sin(angle + _angle);

		this.add(_anchor);

		return this;
	}

	rotateY(_angle, _anchor)
	{
		this.subtract(_anchor);

		let distance = Math.sqrt(Math.pow(this.y,2) + Math.pow(this.z,2));
		let angle = Math.atan2(this.z, this.y);
		
		this.y = distance * Math.cos(angle + _angle);
		this.z = distance * Math.sin(angle + _angle);

		this.add(_anchor);

		return this;
	}

	rotateZ(_angle, _anchor)
	{
		this.subtract(_anchor);

		let distance = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
		let angle = Math.atan2(this.y, this.x);
		
		this.x = distance * Math.cos(angle + _angle);
		this.y = distance * Math.sin(angle + _angle);

		this.add(_anchor);

		return this;
	}

	modify(_function)
	{
		return this.from(_function(this));
	}

	modifyEach(_function)
	{
		return this.modify(
			({x, y, z}) => 
			new Vector3(
				_function(x),
				_function(y),
				_function(z)
			)
		);
	}

	add(_vector2)
	{
		this.x += _vector2.x;
		this.y += _vector2.y;
		this.z += _vector2.z;

		return this;
	}

	subtract(_vector2)
	{
		this.x -= _vector2.x;
		this.y -= _vector2.y;
		this.z -= _vector2.z;

		return this;
	}

	translate(_vector3)
	{
		return this.copy()
			.add(_vector3);
	}

	length()
	{
		return Math.sqrt(
			Math.pow(this.x, 2) +
			Math.pow(this.y, 2) +
			Math.pow(this.z, 2)
		);
	}
}