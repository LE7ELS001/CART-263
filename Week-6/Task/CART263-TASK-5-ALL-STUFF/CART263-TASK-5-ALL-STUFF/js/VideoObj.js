class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY = 10;
    this.shapeCol = "#000000";
    this.shapeSize = 50;
    this.shapeSizeChangeSpeed = 5;
    this.statement = "rect";

    //blur 
    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
    this.userProvidedBlur = 0;
    let self = this;

    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = blurInput.value;
      //console.log(self.userProvidedBlur);
    });


    //sepia 
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");
    this.userProvideSepia = 0;

    filterButton_sepia.addEventListener("click", function () {
      self.userProvideSepia = sepiaInput.value * 0.1;
      //console.log(self.userProvideSepia);
    });

    //hue 
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");
    this.userProvideHue = 0;

    filterButton_hue.addEventListener("click", function () {
      self.userProvideHue = hueInput.value;
      //console.log(self.userProvideHue);
    });


    //invert 
    let filterButton_invert = document.getElementById("filter_button_invert");
    let InvertInput = document.getElementById("invertnum");
    this.userProvideInvert = 0;

    filterButton_invert.addEventListener("click", function () {
      self.userProvideInvert = InvertInput.value;
      //console.log(self.userProvideInvert);
    });

    //canvas 
    let partD_Canvas = document.getElementById("partD");
    //console.log(partD_Canvas);

    //update rectangle position 
    partD_Canvas.addEventListener("mousemove", function (event) {
      let setoff = partD_Canvas.getBoundingClientRect();
      self.updatePositionRect(event.clientX - setoff.x - self.shapeSize / 2, event.clientY - setoff.y - self.shapeSize / 2);
      //console.log(event.clientX);

    }
    );

    partD_Canvas.addEventListener('click', function (event) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let randomColor = `rgb(${r},${g},${b})`;
      self.changeColor(randomColor);
    });

    partD_Canvas.addEventListener('wheel', function (event) {
      if (event.deltaY > 0) {
        if (self.shapeSize <= 50) {
          self.shapeSize = 50;
        }
        else {
          self.shapeSize -= self.shapeSizeChangeSpeed;
        }
      }
      else {
        if (self.shapeSize >= 200) {
          self.shapeSize = 200;
        }
        else {
          self.shapeSize += self.shapeSizeChangeSpeed;
        }
      }
    })


    partD_Canvas.addEventListener("dblclick", function (event) {
      console.log("you press")
      if (self.statement === "rect") {
        self.statement = "draw";
      }
      else {
        self.statement = "rect";
      }
    })



  }



  display() {
    this.context.save();
    // this.context.filter = `blur(${this.userProvidedBlur}px) `;
    // this.context.filter = `sepia(${this.userProvideSepia}) `;
    // this.context.filter = `hue-rotate(${this.userProvideHue}deg)`
    // this.context.filter = `invert(${this.userProvideInvert}%)`;
    this.context.filter = `blur(${this.userProvidedBlur}px) sepia(${this.userProvideSepia}) hue-rotate(${this.userProvideHue}deg) invert(${this.userProvideInvert}%)`;
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);

    if (this.statement === "rect") {

      this.context.fillStyle = this.shapeCol;
      this.context.fillRect(this.shapeX, this.shapeY, this.shapeSize, this.shapeSize);
    }
    else {

      this.context.lineWeight = 3;
      this.context.strokeStyle = 'white'
      this.context.strokeRect(this.shapeX, this.shapeY, this.shapeSize, this.shapeSize);
      this.context.fillRect(this.shapeX, this.shapeY, this.shapeSize, this.shapeSize);
      this.context.drawImage(this.videoElement, this.shapeX, this.shapeY, this.shapeSize, this.shapeSize);
    }
    this.context.restore();
  }

  //called when rectangle color is to be updated
  //called when rectangle Pos is to be updated
  updatePositionRect(mx, my) {
    this.shapeX = mx;
    this.shapeY = my;
  }
  changeColor(newCol) {
    this.shapeCol = newCol;
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}
