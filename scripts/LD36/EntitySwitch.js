var EntitySwitch = function(parent,x,y,w) {
	var h = w;
	EntityTriggerable.call(this,parent,x,y,w,h);
	this.color = "#bbbbbb";
	this.colorP = "#999999";
}
EntitySwitch.prototype = Object.create(EntityTriggerable.prototype);
EntitySwitch.constructor = EntityTriggerable;
EntitySwitch.prototype.tick = function() {
	if (!this.triggered) {
		var c1 = this.checkCollision(this.parent.player);
		if (c1.c) {
			this.trigger(0);
			/*this.parent.wall.setDir(1);
			this.parent.wall.trigger();
			this.parent.triggered.trigger(0);*/
		}
	}		
}