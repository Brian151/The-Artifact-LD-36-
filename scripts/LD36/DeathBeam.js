var DeathBeam = function(parent,x,y,w,h) {
	EntityHarmful.call(this,parent,x,y,w,h);
	this.color = "#ff7700";
	this.solid = false;
	this.imageH = this.parent.assets.requestAsset("image","beamH");
	this.imageV = this.parent.assets.requestAsset("image","beamV");
	this.img = this.imageV;
	this.dmg = 5;
}
DeathBeam.prototype = Object.create(EntityHarmful.prototype);
DeathBeam.constructor = EntityHarmful;
DeathBeam.prototype.setDir = function(x,y) {
	var y2 = y || 0;
	this.dir = {x:x,y:y2};
	if (this.dir.x != 0) this.img = this.imageH;
	if (this.dir.y != 0) this.img = this.imageV;
}
DeathBeam.prototype.handleCollision = function(o,o2,firstRun) {
	var out = {x:o2.x,y:o2.y};
	if (this.dir.x != 0) { //right
		if (this.dir.x > 0) {
			if (o.x < o2.x || firstRun) {
				this.width = (o.x - this.x);
				out.x = o.x
			}
		} else { //left
			if (o.x > o2.x || firstRun) {
				var x2 = (this.x + this.width);
				this.x = (o.x + o.width);
				this.width = x2 - this.x;
				out.x = o.x;
			}
		}
	} 
	if (this.dir.y != 0) {
		if (this.dir.y > 0) { //down
			if (o.y < o2.y || firstRun) {
				this.height = (o.y - this.y);
				out.y = o.y;
			}
		} else { //up
			if (o.y > o2.y || firstRun) {
				var y2 = (this.y + this.height);
				this.y = (o.y + o.height);
				this.height = y2 - this.y;
				out.y = o.y;
			}
		}
	}
	return out;
}
DeathBeam.prototype.tick = function() {
	this.projectLength(); //not at all functional!
	var hasCollided = false;
	var colObj = {};
	for (var i=0; i < this.parent.ents.length; i++) {
		var curr = this.parent.ents[i];
		if (curr.solid) {
			var c1 = this.checkCollision(curr);
			if (c1.c) {
				if (!hasCollided) {
					hasCollided = true;
					colObj.x = curr.x;
					colObj.y = curr.y;
					colObj = this.handleCollision(curr,colObj,true);
				} else {
				colObj = this.handleCollision(curr,colObj,false);
				/*var xReport = (this.dir.x + " | " + curr.x + " | " + colObj.x);
				var yReport = (this.dir.y + " | " + curr.y + " | " + colObj.y);
				Debugger.log("DeathBeam","debug","beam x collision : " + xReport);
				Debugger.log("DeathBeam","debug","beam y collision : " + yReport);*/
				}
			}
		}
	}
}
DeathBeam.prototype.draw = function() {
	this.parent.renderer.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
}
DeathBeam.prototype.projectLength = function() {
	if (this.dir.x > 0) {
		this.width = this.parent.dims.width - this.x;
	} else if (this.dir.x < 0) {
		var x2 = this.x + this.width;
		this.x = 0;
		this.width = this.x + x2;
	}
	if (this.dir.y > 0) {
		this.height = this.parent.dims.height - this.y;
	} else if (this.dir.y < 0) {
		var y2 = this.y + this.height;
		this.y = 0;
		this.height = this.y + y2;
	}
	//console.log(JSON.stringify(this.dir));
}