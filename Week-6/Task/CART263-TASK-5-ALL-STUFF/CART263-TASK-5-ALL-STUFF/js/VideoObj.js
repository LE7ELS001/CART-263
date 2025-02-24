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
      console.log(self.userProvideInvert);
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

    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50, 50)
    this.context.restore();
  }

  //called when rectangle color is to be updated
  changeColor(newCol) {
    /** FILL IN */
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx, my) {
    /** FILL IN */
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}
