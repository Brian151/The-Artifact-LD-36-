var Player = function(parent,x,y,w,h,color) {
	Entity.call(this,parent,x,y,w,h,color);
	this.speed = 4;
	this.health = 30;
	this.dead = false;
}
Player.prototype = Object.create(Entity.prototype);
Player.constructor = Entity;
Player.prototype.tick = function() {
	this.dir = {x:0,y:0};
	var up = this.parent.controller.checkKeyDown(38);
	var right = this.parent.controller.checkKeyDown(39);
	var down = this.parent.controller.checkKeyDown(40);
	var left = this.parent.controller.checkKeyDown(37);
	if (up) this.dir.y = -1;
	if (right) this.dir.x = 1;
	if (down) this.dir.y = 1;
	if (left) this.dir.x = -1;
	var prevX = this.x;
	var prevY = this.y;
	if (!this.dead) {
		this.x += (this.dir.x * this.speed);
		this.y += (this.dir.y * this.speed);
	}
	this.checkInBounds();
	for (var i=0; i < this.parent.ents.length; i++) {
		var curr = this.parent.ents[i];
		var c1 = this.checkCollision(curr);
		if (c1.c) {
			if (curr.solid) {
				this.handleCollision(curr,c1.t,prevX,prevY);
			}
			if (curr.hurts && !this.dead) {
				this.health -= curr.dmg;
			}
		}
	}
	if (this.health <= 0 && !this.dead) { 
		this.color = "#003377";
		this.dead = true;
	}
}