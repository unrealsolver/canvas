CoolInput = function(){
	this.self = this;
	this.text = '';
	this.preparedText = '';
	this.colors = [];
	this.maxSize = 150;
	this.size = this.maxSize;
	this.sizeMin = 50;
	this.lastPos = 0;
	this.charsInLine = 10;
	this.cursor = {x: 0, y: 0};
	this.lineWidth = 0;
	this.xOffstMult = 0.66;
	this.globalOffset = {x: 5, y: 5};
	this.maxLineLength = Math.round(this.charsInLine * this.xOffstMult * this.sizeMin);
	this.maxRows = 4;
	this.maxWidgetHeight = Math.round(Math.max(this.maxRows * this.sizeMin, this.maxSize));
	
	this.draw = function(){
		ctx.save();
	
		var x = 0;
		var y = this.size;
		var lineStart = 0;
		ctx.font= this.size + "px Lucida Console";
		ctx.rect(this.globalOffset.x + 0.5, this.globalOffset.y + 0.5, this.maxLineLength, this.maxWidgetHeight);
		ctx.stroke();
		var xOffst = this.xOffstMult * this.size;
		
		for (var i = 0; i < this.text.length; i++){
			var ch = this.text.charAt(i);
			
			ctx.fillStyle = this.colors[i];
			ctx.fillText(ch, x * xOffst, y);
			x += 1;
			
			if (x >= this.charsInLine){
				x = 0;
				y += this.size;
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
		for (var i = this.colors.length; i < this.text.length; i++){
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
		
		
		//console.log(width);
		return width;
	}
	
	this.measureTextWidth = function(text){
		var width = 0;
		for (var i = 0; i < text.length; i++){
			var ch = this.text.charAt(i);
			width += ctx.measureText(ch).width;
		}
		return width*this.xOffstMult;
	}
	
	
	this.appendText = function(text){
		if (this.cursor.x >= this.charsInLine){
			this.cursor.x = 0;
			this.cursor.y += 1;
			//var actualLen = 10 * this.xOffstMult * this.size;
			//console.log(actualLen);
		} else {
			this.cursor.x += text.length;
		}
		
		this.text += text;
		
		if (this.cursor.y == 0){
			var actualLen = this.cursor.x * this.xOffstMult * this.size;
			if (actualLen > this.maxLineLength){
				this.size *= this.maxLineLength / actualLen;
				if (this.size < this.minSize || this.cursor.x == this.charsInLine){
					this.size = this.sizeMin;
				}
				//console.log(this.size);
			}
		}
		
		//this.prepareText();
		this.generateColors();
		
		//~ if (this.calculateWidth() > 250){
			//~ var aspect = 250 / this.calculateWidth();
			//~ var size = Math.round(this.maxSize * aspect);
			//~ if (size > this.sizeMin){
				//~ this.size = size;
			//~ }
		//~ }
	}
	
	this.randomColor = function(){
	    var r = Math.floor(Math.random()*256);
	    var g = Math.floor(Math.random()*256);
	    var b = Math.floor(Math.random()*256);
	    return "rgb("+ r + "," + g + "," + b +")";
	}
	
	this.appendText('3.14');
	//this.prepareText();
	//this.generateColors();
}

CoolInput.prototype.constructor = CoolInput;
