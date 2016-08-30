var BeamCannon = function(parent,x,y,type) {
	var w = 32;
	var h = 32;
	EntityTriggerable.call(this,parent,x,y,w,h);
	this.solid = true;
	this.beam0 = null;
	this.beam1 = null;
	this.beam2 = null;
	this.beam3 = null;
	this.beam0Enabled = false;
	this.beam1Enabled = false;
	this.beam2Enabled = false;
	this.beam3Enabled = false;
	this.states = [
		[
			{type:"shoot",p1:0},
			{type:"noShoot",p1:3},
		],
		[
			{type:"shoot",p1:1},
			{type:"noShoot",p1:0},
		],
		[
			{type:"shoot",p1:2},
			{type:"noShoot",p1:1},
		],
		[
			{type:"shoot",p1:3},
			{type:"noShoot",p1:2},
		]
	];
	this.triggers = [
		[
			{type:"disable"}
		]
	]
	this.setTimer(true,35);
	//this.activate(3);
	this.setState(0);
	this.image1 = this.parent.assets.requestAsset("image","beamOn");
	this.image2 = this.parent.assets.requestAsset("image","beamOff");
	this.img = this.image1;
}
BeamCannon.prototype = Object.create(EntityTriggerable.prototype);
BeamCannon.constructor = EntityTriggerable;
BeamCannon.prototype.tick = function() {
	this.checkTimer();
}
BeamCannon.prototype.activate = function(side) {
	switch(side) {
		case 0 : {
			this.parent.ents.push(
				this.beam0 = new DeathBeam(
					this.parent,
					this.x,
					(this.y + this.height),
					this.width,
					this.parent.dims.height - (this.y + this.height)
				)
			); //bot
			this.beam0Enabled = true;
			this.beam0.setDir(0,1);
			break;
		}
		case 1 : {
			this.parent.ents.push(
				this.beam1 = new DeathBeam(
					this.parent,
					0,
					this.y,
					0 + this.x,
					this.height
				)
			); //left
			this.beam1Enabled = true;
			this.beam1.setDir(-1,0);
			break;
		}
		case 2 : {
			this.parent.ents.push(
				this.beam2 = new DeathBeam(
					this.parent,
					this.x,
					0,
					this.width,
					0 + this.y
				)
			); //top
			this.beam2Enabled = true;
			this.beam2.setDir(0,-1);
			break;
		}
		case 3 : {
			this.parent.ents.push(
				this.beam3 = new DeathBeam(
					this.parent,
					this.x + this.width,
					this.y,
					this.parent.dims.width - (this.x + this.width),
					this.height
				)
			); //right
			this.beam3Enabled = true;
			this.beam3.setDir(1,0);
			break;
		}
		default : {
			Debugger.log("BeamCannon","ERROR","no beam exists with id : " + sides + ", cannot activate beam!");
			break;
		}
	}
}
BeamCannon.prototype.deActivate = function(side) {
	switch(side) {
		case 0 : {
			if (this.beam0Enabled) {
				this.beam0.dead = true; //bot
				this.beam0Enabled = false;
			}
			break;
		}
		case 1 : {
			if (this.beam1Enabled) {
				this.beam1.dead = true; //left
				this.beam1Enabled = false;
			}
			break;
		}
		case 2 : {
			if (this.beam2Enabled) {
				this.beam2.dead = true; //top
				this.beam2Enabled = false;
			}
			break;
		}
		case 3 : {
			if (this.beam3Enabled) {
				this.beam3.dead = true; //right
				this.beam3Enabled = false;
			}
			break;
		}
		default : {
			Debugger.log("BeamCannon","ERROR","no beam exists with id : " + sides + ", cannot activate beam!");
			break;
		}
	}
}
BeamCannon.prototype.doExeCustom = function(e) {
	//Debugger.log("BeamCannon","debug","execute type : " + e.type);
	switch(e.type) {
		case "shoot" : {
			this.activate(e.p1);
			//Debugger.log("BeamCannon","debug","execute pars : " + e.p1);
			break;
		}
		case "noShoot" : {
			this.deActivate(e.p1);
			//Debugger.log("BeamCannon","debug","execute pars : " + e.p1);
			break;
		}
		case "disable" : {
			this.disable();
		}
	}
}
BeamCannon.prototype.disable = function() {
	for (var i=0; i < 4; i++) {
		this.deActivate(i);
	}
	this.setTimer(false,0);
	this.img = this.image2;
}
BeamCannon.prototype.draw = function() {
	this.parent.renderer.drawImage(this.img,this.x,this.y);
	//WIP...
	/*
	var half = this.width / 2;
	var halfW = (this.parent.player.width / 2)
	var halfH = (this.parent.player.height / 2)
	var a1 = MathUtils.radians(0);
	var a2 = MathUtils.radians(360);
	var pDX = Math.pow((Math.abs(this.x + half) - (this.parent.player.x + halfW)), 2);
	var pDY = Math.pow((Math.abs(this.y + half) - (this.parent.player.y + halfH)), 2);
	var distSquared = pDX + pDY;
	var dist = Math.sqrt(distSquared);
	this.parent.renderer.beginPath();
	this.parent.renderer.ctx.strokeStyle = "#ff0000";
	this.parent.renderer.ctx.lineWidth = 1;
	this.parent.renderer.arc(this.x + half, this.y + half, 200,a1,a2);
	this.parent.renderer.stroke();
	if (dist <= 200) {
		this.parent.renderer.ctx.strokeStyle = "rgba(0,128,255,.25)";
		this.parent.renderer.ctx.lineCap = "round";
		this.parent.renderer.beginPath();
		this.parent.renderer.ctx.lineWidth = 12;
		this.parent.renderer.moveTo(this.x + half, this.y + half);
		this.parent.renderer.lineTo(this.parent.player.x + halfW,this.parent.player.y + halfH)
		this.parent.renderer.stroke();
		this.parent.renderer.beginPath();
		this.parent.renderer.ctx.strokeStyle = "rgba(0,128,255,.5)";
		this.parent.renderer.ctx.lineWidth = 10;
		this.parent.renderer.moveTo(this.x + half, this.y + half);
		this.parent.renderer.lineTo(this.parent.player.x + halfW,this.parent.player.y + halfH)
		this.parent.renderer.stroke();
		this.parent.renderer.beginPath();
		this.parent.renderer.ctx.strokeStyle = "rgba(0,196,255,.75)";
		this.parent.renderer.ctx.lineWidth = 6;
		this.parent.renderer.moveTo(this.x + half, this.y + half);
		this.parent.renderer.lineTo(this.parent.player.x + halfW,this.parent.player.y + halfH)
		this.parent.renderer.stroke();
		this.parent.renderer.beginPath();
		this.parent.renderer.ctx.strokeStyle = "rgba(196,255,255,1)";
		this.parent.renderer.ctx.lineWidth = 6;
		this.parent.renderer.moveTo(this.x + half, this.y + half);
		this.parent.renderer.lineTo(this.parent.player.x + halfW,this.parent.player.y + halfH)
		this.parent.renderer.stroke();
	}
	*/
}