window.onload = setup;
function setup() {
    console.log("events!")
}

let introSection = document.querySelector("#intro");
console.log(introSection);
introSection.addEventListener("click", function (e) {
    // console.log(this);
    // console.log(e);
    //console.log(document.querySelector(`#${this.id} p`));
    let cssObj = window.getComputedStyle(this, null);
    let bgColor = cssObj.getPropertyValue("background-color");
    console.log(bgColor);
    getColorObj(bgColor);
    document.querySelector(`#${this.id} p`).style.background = `rgba(125, 239, 110, 0.75)`;
    console.log(this);
    this.style.setProperty("opacity", ".5");
    //a:
    this.style.background = `rgba(214, 110, 239, 0.5)`


});

function getColorObj(color) {
    let colorArray = color.match(/(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d+(\.\d+)?))?/);
    colorArray.splice(0, 1);
    console.log(colorArray);

    if (colorArray[3] && colorArray[4]) {
        colorArray[3] = colorArray[3] + colorArray[4];
        colorArray.splice(4, 1);
    }

    if (colorArray[4] === '.0') {

    }
    return colorArray;
}