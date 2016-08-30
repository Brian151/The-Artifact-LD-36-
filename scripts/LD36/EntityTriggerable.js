var EntityTriggerable = function(parent,x,y,w,h) {
	this.color = "#00ff00";
	this.colorP = "#007700";
	Entity.call(this,parent,x,y,w,h,this.color);
	this.solid = false;
	this.triggered = false;
	this.triggerExts = false;
	this.triggerTargets = [];
	this.states = [];
	this.currentState = 0;
	this.currentStateTimer = {e:false,t:0};
	this.timer = 0;
	this.triggers = [];
	this.id = "";
}
EntityTriggerable.prototype = Object.create(Entity.prototype);
EntityTriggerable.constructor = Entity;
EntityTriggerable.prototype.onTrigger = function(t) {
	this.doTriggered(t);
}
EntityTriggerable.prototype.trigger = function(t) {
	if (!this.triggered) {
		this.color = this.colorP;
		this.triggered = true;
		this.onTrigger(t);
	}
}
EntityTriggerable.prototype.doTriggered = function(t) {
	var t2 = t;
	if (t >= this.triggers.length) t2 = this.triggers.length - 1;
	if (this.triggers.length > 0) {
		var curr = this.triggers[t2];
		for (var i=0; i < curr.length; i++) {
			var curr2 = curr[i];
			this.doExecute(curr2);
		}
	}
}
EntityTriggerable.prototype.doExecute = function(e) {
	switch(e.type) {
		case "nextState" : {
			this.advanceState();
			break;
		}
		case "setState" : {
			this.setState(e.p1);
			break;
		}
		case "setTimer" : {
			this.setTimer(e.p1,e.p2);
			break;
		}
		case "triggerExt" : {
			var target = this.getLinked(e.p1);
			if (!target.notFound) {
				target.doExecute(e.p2);
			} else {
				Debugger.log("","error","Cannot find Triggerable Entity with link : " + e.p1 + "!");
			}
			break;
		}
		default : {
			this.doExeCustom(e);
		}
	}
}
EntityTriggerable.prototype.advanceState = function() {
	if (this.currentState < this.states.length) {
		this.setState(this.currentState + 1);
	} else {
		this.setState(0);
	}
}
EntityTriggerable.prototype.setState = function(s) {
	var s2 = s;
	if (s2 < this.states.length) {
		//nothing needed
	} else {
		s2 = 0;
	}
	if (this.states.length > 0) {
		this.currentState = s2;
		var curr = this.states[this.currentState];
		for (var i=0; i < curr.length; i++) {
			var curr2 = curr[i];
			this.doExecute(curr2);
		}
	}
}
EntityTriggerable.prototype.setTimer = function(enableTimer,timing) {
	this.currentStateTimer = {e:enableTimer,t:timing};
	this.timer = 0;
}
EntityTriggerable.prototype.checkTimer = function() {
	if (this.currentStateTimer.e) {
		if (this.timer >= this.currentStateTimer.t) {
			this.timer = 0;
			this.advanceState();
		} else {
			this.timer++;
		}
	}
}
EntityTriggerable.prototype.doExeCustom = function() {
	
}
EntityTriggerable.prototype.setTriggers = function(t) {
	this.triggers = t;
}
EntityTriggerable.prototype.setID = function(i) {
	this.id = i;
}
EntityTriggerable.prototype.getLinked = function(l) {
	var out = {notFound:true};
	for (var i=0; i < this.parent.ents.length; i++) {
		var curr = this.parent.ents[i];
		if (curr.id == l) {
			out = curr;
			break;
		}
	}
	return out;
}
