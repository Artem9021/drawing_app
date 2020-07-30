window.addEventListener('load', () => {
  const canvas = document.querySelector("#canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext('2d');
  let color = "#000000";
  let drawing = false;
  let width = 10;
  let rect = false;
  let eraser = false;
  function startdraw(e) {
    ctx.beginPath();
    drawing = true;
    draw(e);
  }

  function stopdraw(e) {
    drawing = false;
  }

  function draw(e) {
    if (drawing) {
      // desktop and mobile -friendly
      try {
        touch = e.touches[0];
        x = touch.pageX;
        y = touch.pageY;
      } catch (err) {
        x = e.clientX;
        y = e.clientY;
      }


      width = document.querySelector(".slider").value;
      ctx.lineWidth = width;
      if (eraser){
      	ctx.strokeStyle = "#fff" 
      }
      else {
      	ctx.strokeStyle = color;
      }
      ctx.lineCap = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }
  // event listeners
  canvas.addEventListener("mousedown", startdraw);
  canvas.addEventListener("mouseup", stopdraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", startdraw);
  canvas.addEventListener("touchend", stopdraw);
  canvas.addEventListener("touchmove", draw);
  document.querySelector(".nav-btn").addEventListener("click", opensidenav);
  document.querySelector(".colorpicker").addEventListener("change", colorpickerchange, false);
  document.querySelector(".clear").addEventListener("click", clearcanvas);
  document.querySelector(".eraser").addEventListener("click", toggleeraser)

  function clearcanvas(event) {
	  	swal("Do you really want to clear canvas?", {
		  buttons: {
		    cancel: "No",
		    yes: "Yes",
		  },
		})
		.then((value) => {
		  if (value == 'yes') {
		      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		      
		 
		 
	  }
	});
    

  }

  function toggleeraser(){
  	if (eraser){
  		document.querySelector(".eraser").classList.remove("on");
  		eraser = false;
  	}
  	else {
  		document.querySelector(".eraser").classList.add("on");
  		eraser = true;
  	}
  }
  function colorpickerchange(event) {
    color = event.target.value;
  }
});

function opensidenav() {
  document.querySelector(".nav").classList.toggle("opened");
  document.querySelector(".nav-btn").classList.toggle("opened");

}
