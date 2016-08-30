var Wall = function(parent,x,y,w,h) {
	this.color = "#ffff00";
	Entity.call(this,parent,x,y,w,h,this.color);
	this.solid = true;
	var img0 = this.parent.assets.requestAsset("image","wall");
	this.img = this.parent.renderer.preRenderPattern(img0,this.width,this.height);
	var slice = {type:"image",img:"wallOverlay",skin:{t:2,r:2,b:2,l:2}};
	this.overlay = new s9(this.parent,this.x+2,this.y+2,this.width-4,this.height-4,slice);
}
Wall.prototype = Object.create(Entity.prototype);
Wall.constructor = Entity;
Wall.prototype.draw = function() {
	this.parent.renderer.putImageData(this.img,this.x,this.y);
	this.overlay.draw();
}