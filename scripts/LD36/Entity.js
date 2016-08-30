var Entity = function(parent,x,y,w,h,color) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.color = color;
	this.maxX = (this.parent.dims.width - this.width);
	this.maxY = (this.parent.dims.height - this.height);
	this.speed = 1;
	this.dir = {x:0,y:0};
	this.solid = false;
	this.collidable = true;
	this.health = 1;
	this.dead = false;
}
Entity.prototype.draw = function() {
	this.parent.renderer.ctx.fillStyle = this.color;
	this.parent.renderer.fillRect(this.x,this.y,this.width,this.height);
}
Entity.prototype.checkInBounds = function() {
	var out = "none";
	if(this.x < 0) {this.x = 0; out = "left";}
	if(this.x >= (this.parent.dims.width - this.width)) {this.x = this.maxX; out = "right";}
	if(this.y < 0) {this.y = 0; out = "up";}
	if(this.y >= (this.parent.dims.height - this.height)) {this.y = this.maxY; out = "down";}
	return out;
}
Entity.prototype.checkCollision = function(o,o2) {
	var out = {c:false};
	var checks = 0;
	var obj2 = o2 || this;
	if (((obj2.x + obj2.width) - 1 >= o.x) &&
	(obj2.x <= (o.x + o.width) - 1)) {
		checks++;
	}
	if (((obj2.y + obj2.height) - 1 >= o.y) && 
	(obj2.y <= (o.y + o.height) - 1)) {
		checks++;
	}
	out.c = (checks == 2);
	if (out.c) {
		var cH = "";
		var cV = "";
		if (obj2.dir.x != 0) {
			out.h = true;
			if (obj2.dir.x == 1) {
				cH = "left";
			} else {
				cH = "right"
			}
		}
		if (obj2.dir.y != 0) {
			out.v = true;
			if (obj2.dir.y == 1) {
				cV = "top";
			} else {
				cV = "bot"
			}
		}
		out.t = cV + cH;
		
	}
	return out;
}
Entity.prototype.tick = function() {
	var c1 = this.checkInBounds();
}
Entity.prototype.setDir = function(x,y) {
	var x2 = x || this.dir.x;
	var y2 = y || this.dir.y;
	this.dir = {x:x2,y:y2};
}
Entity.prototype.handleCollision = function(o,edge,prevX,prevY) {
	switch (edge) {
		case "left" : {
			this.x = (o.x - this.width);
			break;
		}
		case "right" : {
			this.x = (o.x + o.width);
			break;
		}
		case "top" : {
			this.y = (o.y - this.height);
			break;
		}
		case "bot" : {
			this.y = (o.y + o.height);
			break;
		}
		default : {
			this.x = prevX;
			this.y = prevY;
			break;
		}
	}
}