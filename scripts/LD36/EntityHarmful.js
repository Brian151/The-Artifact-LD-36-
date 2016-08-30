var EntityHarmful = function(parent,x,y,w,h) {
	this.color = "#ff0000";
	Entity.call(this,parent,x,y,w,h,this.color);
	this.solid = false;
	this.hurts = true;
	this.dmg = 1;
}
EntityHarmful.prototype = Object.create(Entity.prototype);
EntityHarmful.constructor = Entity;