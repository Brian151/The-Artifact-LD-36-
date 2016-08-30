/*
LUDUM DARE 36 - GAME SETUP
*/

Game.prototype.init = function(mainCanvas) {
	this.state = "init";
	this.canvas = document.getElementById(mainCanvas);
	this.controller = GameObjs.controller = new InputManager(this);
	this.assets = GameObjs.assets = new AssetManager(this,"assets/");
	this.renderer = GameObjs.renderer = new GraphicsHandler(this.canvas);
	Debugger.log("MyGame","info","game init!");
	this.dims = {width:this.canvas.width,height:this.canvas.height};
	var checkDims = JSON.stringify(this.dims);
	Debugger.log("MyGame","info",checkDims);
	this.assets.loadAsset("image","beamH.png","beamH");
	this.assets.loadAsset("image","beamV.png","beamV");
	this.assets.loadAsset("image","sand.png","sandBG");
	this.assets.loadAsset("image","beamGun.png","beamOn");
	this.assets.loadAsset("image","beamGunOff.png","beamOff");
	this.assets.loadAsset("image","wallTexture.png","wall");
	this.assets.loadAsset("image","wallBevel.png","wallOverlay");
	this.assets.loadAsset("image","wallTexture2.png","wall2");
	this.ents = [];
}

Game.prototype.tick = function(){
	this.assets.tick();
	if (this.state == "init"){
		if(this.assets.queuecomplete) {
			this.state = "load";
			var map = [
				{type:"player",pars:{x:0.5,y:0.5}},
				{type:"wall",pars:{x:0,y:2,w:10,h:1}},
				{type:"coin",pars:{x:10,y:10}},
			]
			this.loadLevel(map);
			Debugger.log("MyGame","info","game loaded!");
			//this.player = new Player(this,0,0,32,32,"#0077ff");
			
		}
	}
	
	if(this.state == "play") {
		for (var i=0; i < this.ents.length; i++) {
			var curr = this.ents[i];
			curr.tick();
		}
		for (var i=this.ents.length - 1; i >= 0; i--) {
			var curr = this.ents[i];
			if (curr.dead) this.ents.splice(i,1);
		}
		this.player.tick();
		this.draw();
	}
}

Game.prototype.draw = function(){
	if (this.state == "play") {
	this.renderer.clearRect(0,0,600,400);
	var img = this.assets.requestAsset("image","sandBG");
	var pat = this.renderer.ctx.createPattern(img,"repeat");
	this.renderer.ctx.fillStyle = pat;
	this.renderer.fillRect(0,0,600,400);
	for (var i=0; i < this.ents.length; i++) {
		var curr = this.ents[i];
		curr.draw();
	}
	this.player.draw();
	}
	
	if (this.state == "win") {
		this.renderer.ctx.fillStyle = "#0077ff";
		this.renderer.ctx.font = "48px Arial";
		this.renderer.ctx.fillText("WIN!",100,100);
	}
}

Game.prototype.loadLevel = function(lDat) {
	for (var i = 0; i < lDat.length; i++) {
		var curr = lDat[i];
		switch (curr.type) {
			case "player" : {
				this.spawnPlayer(curr);
				break;
			}
			case "wall" : {
				this.spawnWall(curr);
				break;
			}
			case "coin" : {
				this.spawnCoin(curr);
				break;
			}
		}
	}
	this.state = "play";
}

Game.prototype.spawnPlayer = function(p) {
	this.player = new Player(this,p.pars.x * 32,p.pars.y * 32,32,32,"#0077ff");
}

Game.prototype.spawnWall = function(w) {
	this.ents.push(new Wall(this,w.pars.x * 32,w.pars.y * 32,w.pars.w * 32,w.pars.h * 32));
}

Game.prototype.spawnCoin = function(c) {
	this.ents.push(new Coin(this,c.pars.x * 32,c.pars.y * 32));
}