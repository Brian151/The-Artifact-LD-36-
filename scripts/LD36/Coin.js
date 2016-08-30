var Coin = function(parent,x,y) {
	var w = 32;
	var h = 32;
	var color = "#ff9900";
	Entity.call(this,parent,x,y,w,h,color);
	this.speed = 4;
	this.health = 30;
	this.dead = false;
}
Coin.prototype = Object.create(Entity.prototype);
Coin.constructor = Entity;
Coin.prototype.tick = function() {
	var c1 = this.checkCollision(this.parent.player);
	if (c1.c) {
		this.parent.state = "win";
	}
}