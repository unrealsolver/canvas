CoolInput = function(){
	this.self = this;
	this.text = 'SAMPLE';
	this.preparedText = '';
	this.colors = [];
	this.maxSize = 70;
	this.size = this.maxSize;
	this.sizeMin = 20;
	this.lastPos = 0;
	
	this.draw = function(){
		ctx.save();
	
		ctx.fillRect(0,0, 50, 50);
		var x = 0;
		var y = 100;
		var lineStart = 0;
		ctx.font= this.size + "px Helvetica";
		
		for (var i = 0; i < this.preparedText.length; i++){
			var ch = this.preparedText.charAt(i);
			
			//~ if (this.calculateWidth(lineStart, i) > 1250){
				//~ lineStart = i;
				//~ y += 40;
				//~ x = 0;
			//~ }
			
			
			ctx.fillStyle = this.colors[i];
			ctx.fillText(ch, x, y);
			if (ch == '\n'){
				x = 0;
				y += this.size;
			} else {
				x += ctx.measureText(ch).width;
			}
		}
		
		ctx.restore();
	};
	
	this.prepareText = function(){
		var startPos = 0;
		var width;
		this.preparedText = this.preparedText.substring(0, this.lastPos);
		
		for (var i = this.lastPos; i < this.text.length; i++){
			this.preparedText += this.text.charAt(i);
			width = this.calculateWidth(startPos, i);
			if (width > 200){
				this.preparedText += '|\n';
				startPos = i;
				this.lastPos = i;
			}
		}
	}
	
	this.generateColors = function(){
		for (var i = this.colors.length; i < this.preparedText.length; i++){
			this.colors[i] = this.randomColor();
		}
	}
	
	this.calculateWidth = function(start, end){
		var width = 0;
		start = start || 0;
		end = end || this.text.length;
		
		for (var i = start; i < end; i++){
			var ch = this.text.charAt(i);
			width += ctx.measureText(ch).width * 3;
		}
		
		
		console.log(width);
		return width;
	}
	
	this.appendText = function(text){
		this.text += text;
		this.prepareText();
		this.generateColors();
		
		if (this.calculateWidth() > 250){
			var aspect = 250 / this.calculateWidth();
			var size = Math.round(this.maxSize * aspect);
			if (size > this.sizeMin){
				this.size = size;
			}
		}
	}
	
	this.randomColor = function(){
	    var r = Math.floor(Math.random()*256);
	    var g = Math.floor(Math.random()*256);
	    var b = Math.floor(Math.random()*256);
	    return "rgb("+ r + "," + g + "," + b +")";
	}
	
	this.prepareText();
	this.generateColors();
}

CoolInput.prototype.constructor = CoolInput;
