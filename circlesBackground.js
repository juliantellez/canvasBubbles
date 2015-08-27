(function () {
  var canvas,
    ctx,
    circlesQuantity = 100,
    circlesMaxRadius = 75;

    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = 'rgb(19,80,80)';
    canvas.style.width = '100%'
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

	window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

	function loop(){

		window.requestAnimationFrame(loop);
		ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
		drawCicles(circlesQuantity);
	}

	function circle(options){
		var that = {};
			that.x = options.x || 0;
			that.y = options.y || 0;
			that.radius = options.radius || Math.floor(circlesMaxRadius * Math.random());

			that.update = function(){
				if(that.y > 0){
					that.y -= .5;
					that.x += Math.floor(10 * Math.sin(.1 * Math.random()));
				} else {
					that.y = canvas.height;
					that.x = Math.floor(canvas.width * Math.random());
				}	
			}

			that.draw = function () {

				ctx.beginPath();
				ctx.arc(that.x, 
						that.y, 
						that.radius, 
						0, 
						2 * Math.PI, 
						false);
				ctx.fillStyle = 'rgba(43,118,120,.5)';
				ctx.fill();
			}

			return that;	
	}
	
	function createCircles(quantity){
		var i;
		for(i = 0; i < quantity; i++){
			circle[i] = new circle({
				x: canvas.width * Math.random(),
				y: canvas.height * Math.random()
			})
		}
	}

	function drawCicles (quantity){
		var i;
		for(i = 0; i < quantity; i += 1){
			circle[i].update();
			circle[i].draw();
		}
	}

	createCircles(circlesQuantity);
	loop();

})();