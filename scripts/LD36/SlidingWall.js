var SlidingWall = function(parent,x,y,w,h) {
	EntityTriggerable.call(this,parent,x,y,w,h);
	this.color = "#777700";
	this.colorP = "#999900";
	this.speed = 6;
	this.solid = true;
	var img0 = this.parent.assets.requestAsset("image","wall2");
	this.img = this.parent.renderer.preRenderPattern(img0,this.width,this.height);
	var slice = {type:"image",img:"wallOverlay",skin:{t:2,r:2,b:2,l:2}};
	this.overlay = new s9(this.parent,this.x+2,this.y+2,this.width-4,this.height-4,slice);
}
SlidingWall.prototype = Object.create(EntityTriggerable.prototype);
SlidingWall.constructor = EntityTriggerable;
SlidingWall.prototype.tick = function() {
	var c1 = this.checkInBounds();
	switch(c1) {
		case "none" : {
			break;
		}
		case "left" : {
			this.dir.x = 0;
			break;
		}
		case "right" : {
			this.dir.x = 0;
			break;
		}
		case "up" : {
			this.dir.y = 0;
			break;
		}
		case "down" : {
			this.dir.y = 0;
			break;
		}
	}
	this.x += (this.dir.x * this.speed);
	this.y += (this.dir.y * this.speed);
	this.overlay.x = this.x + 2;
	this.overlay.y = this.y + 2;
}
/*
old sliding wall movement...re-add later!
(after fixing some things with boundary detection)
switch(c1) {
		case "none" : {
			break;
		}
		case "left" : {
			this.dir.x = 1;
			break;
		}
		case "right" : {
			this.dir.x = -1;
			break;
		}
		case "up" : {
			this.dir.y = 1;
			break;
		}
		case "down" : {
			this.dir.y = -1;
			break;
		}
	}
*/
SlidingWall.prototype.draw = function() {
	this.parent.renderer.putImageData(this.img,this.x,this.y);
	this.overlay.draw();
}