window.onload = setup;
function setup() {
    console.log("events!")
    let introSection = document.querySelector("#intro");
    console.log(introSection);
    // introSection.addEventListener("click", function (e) {
    // console.log(this);
    // console.log(e);
    //console.log(document.querySelector(`#${this.id} p`));
    //document.querySelector(`#${this.id} p`).style.background = `rgba(125, 239, 110, 0.75)`;
    //console.log(this);
    //this.style.setProperty("opacity", ".5");
    //a:
    //this.style.background = `rgba(214, 110, 239, 0.5)`



    // let cssObj = window.getComputedStyle(this, null);
    // let bgColor = cssObj.getPropertyValue("background-color");
    // getColorObj(bgColor);
    // let backgroundColorArray = getColorObj(bgColor)


    // console.log(bgColor);
    // console.log(backgroundColorArray)


    // //set the outer div
    // this.style.background = `rgba(
    //                           ${backgroundColorArray[0]},
    //                           ${backgroundColorArray[1]},
    //                           ${backgroundColorArray[2]},
    //                           0.5)`;
    // document.querySelector(`#${this.id} p`).style.background = `rgba(
    //                           ${backgroundColorArray[0]},
    //                           ${backgroundColorArray[1]},
    //                           ${backgroundColorArray[2]},
    //                           0.75)`;


    let allSections = document.querySelectorAll(".mouseclick-active-section");
    for (let element of allSections) {
        //add to each element
        element.addEventListener("click", function (e) {
            console.log("is in now active");
            let cssObj = window.getComputedStyle(this, null);
            //get prop VALUE :: new
            let bgColor = cssObj.getPropertyValue("background-color");
            let backgroundColorArray = getColorObj(bgColor);
            if (this.getAttribute("custom-bool") === "inactive") {
                this.style.background = `rgba(
                                                    ${backgroundColorArray[0]},
                                                    ${backgroundColorArray[1]},
                                                    ${backgroundColorArray[2]},
                                                    0.5)`
                document.querySelector(`#${this.id} p`).style.background = `rgba(
                                                    ${backgroundColorArray[0]},
                                                    ${backgroundColorArray[1]},
                                                    ${backgroundColorArray[2]},
                                                    0.75)`
                //mAKE active
                this.setAttribute("custom-bool", "active")
            }
            else {
                console.log('is now active')
                this.setAttribute("custom-bool", "inactive")
                this.style.background = `rgba(
                            ${backgroundColorArray[0]},
                            ${backgroundColorArray[1]},
                            ${backgroundColorArray[2]},
                            1.0)`

                document.querySelector(`#${this.id} p`).style.background = ""

            }

            // //a:
            // this.style.background = `rgba(
            //                 ${backgroundColorArray[0]},
            //                 ${backgroundColorArray[1]},
            //                 ${backgroundColorArray[2]},
            //                 0.5)`;
            // document.querySelector(`#${this.id} p`).style.background = `rgba(
            //                                   ${backgroundColorArray[0]},
            //                                   ${backgroundColorArray[1]},
            //                                   ${backgroundColorArray[2]},
            //                                   0.75)`;
        });
    } //end for loop

    document.querySelector("#bubbleButton").addEventListener("click", function () {
        console.log("button clicked");
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
        bubble.style.top = `${Math.random() * (window.innerHeight - 200)}px`;

        let r = Math.ceil(Math.random() * 255); //new Math.ceil
        let g = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);

        bubble.style.background = `rgba(${r},${g},${b})`;
        document.getElementById("top-layer").appendChild(bubble)

    })

    // });
}


// function getColorObj(color) {
//     let colorArray = color.match(/(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d+(\.\d+)?))?/);
//     colorArray.splice(0, 1);
//     //console.log(colorArray);


//     if (colorArray[4] === '.0' || !colorArray[4]) {
//         colorArray.splice(4, 1);


//     }
//     if (!colorArray[3]) {
//         colorArray.splice(3, 1);
//     }
//     console.log(colorArray.length);

//     for (let i = 0; i < colorArray.length; i++) {
//         console.log(colorArray[i]);
//     }
//     return colorArray;
// }

function getColorObj(inColor) {
    let substringColor = inColor.substring(
        inColor.indexOf("(") + 1,
        inColor.indexOf(")")
    );
    let rgbArray = [];
    rgbArray = substringColor.split(",");
    return rgbArray;
}