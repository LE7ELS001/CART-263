window.onload = function () {
    // let gridArray = [];
    // for (let i = 0; i < 24; i++) {
    //     //for each x - make a column of changing y's
    //     let gridCol = [];
    //     for (let j = 0; j < 24; j++) {
    //         //create a grid cell with a div
    //         let parent = document.getElementById("parent");
    //         let d = document.createElement("div");
    //         d.classList.add("grid-cell");
    //         parent.appendChild(d);

    //         d.style.left = (i + 1) * 25 + "px";
    //         d.style.top = (j + 1) * 25 + "px";
    //         gridCol[j] = d;
    //     }
    //     //put each grid row into the grid array
    //     gridArray[i] = gridCol;
    // }
    // console.log(gridArray);

    // let shades = [
    //     "#7fb3d5", //grey blue first
    //     "#76d7c4",
    //     "#f7dc6f",
    //     "#eb984e",
    //     "#cb4335",
    //     "#8e44ad",
    //     "#2e4053",
    //     "#e5e7e9",
    // ];

    // let num = 2;
    // setInterval(animate_cells_mod_rows, 1000);




    // function animate_cells_mod_rows() {
    //     for (let i = 0; i < 24; i++) {
    //         for (let j = 0; j < 24; j++) {
    //             let d = gridArray[i][j]
    //             //check the j--> y value for color choice (all same ys will have the same color (a row))
    //             if (j % num === 0) {
    //                 d.style.background = shades[0];
    //             } else if (j % num === 1) {
    //                 d.style.background = shades[1];
    //             } else if (j % num === 2) {
    //                 d.style.background = shades[2];
    //             } else if (j % num === 3) {
    //                 d.style.background = shades[3];
    //             } else if (j % num === 4) {
    //                 d.style.background = shades[4];
    //             } else if (j % num === 5) {
    //                 d.style.background = shades[5];
    //             } else if (j % num === 6) {
    //                 d.style.background = shades[6];
    //             } else if (j % num === 7) {
    //                 d.style.background = shades[7];
    //             }
    //         }
    //     }
    //     num += 1;
    //     console.log(num);
    //     if (num === 9) { num = 1 }
    // }


    // let speed = 1000;
    // window.setTimeout(addTextDynamic, speed);

    // function addTextDynamic() {
    //     console.log("adding");
    //     console.log(speed);
    //     let sp = document.createElement("span");
    //     sp.textContent = " adding Text ";
    //     sp.classList.add("appearInText");
    //     document.getElementById("parent").appendChild(sp);
    //     if (speed > 20) speed -= 20;
    //     setTimeout(addTextDynamic, speed);
    // }

    // let ref = window.setInterval(addOtherText, 500);
    // let counter = 0;
    // function addOtherText() {
    //     let sp = document.createElement("span");
    //     sp.textContent = " ***-*** ";
    //     sp.classList.add("appearInStarText");
    //     document.getElementById("parent").appendChild(sp);
    //     counter++;
    //     if (counter === 10) {
    //         clearInterval(ref);
    //     }
    // }

    // let randomChanceToRun = setTimeout(oneTimeText, 500);

    // let num2 = Math.random();
    // if (num2 < 0.5) { // 50% chance
    //     defusedText();
    //     clearTimeout(randomChanceToRun);
    // }
    // console.log(num2);

    // function oneTimeText() {
    //     let sp = document.createElement("span");
    //     sp.textContent = " TIME OUT ";
    //     sp.classList.add("timeOutText");
    //     document.getElementById("parent").appendChild(sp);
    // }


    // function defusedText() {
    //     let sp = document.createElement("span");
    //     sp.textContent = "DEFUSED";
    //     sp.classList.add("timeOutText");
    //     document.getElementById("parent").appendChild(sp);
    // }

    window.requestAnimationFrame(animate);

    function animate() {
        let p = document.getElementById("particle");
        p.style.left = parseInt(p.style.left) + 2 + "px";
        p.style.top = parseInt(p.style.top) + 3 + "px";
    }


    let speedX = 2;
    let speedY = 3;

    window.requestAnimationFrame(animate);
    function animate() {
        let p = document.getElementById("particle");

        p.style.left = parseInt(p.style.left) + speedX + "px";
        p.style.top = parseInt(p.style.top) + speedY + "px";
        window.requestAnimationFrame(animate);
        checkBounds(document.getElementById("parent"), p);

    }

    function checkBounds(parent, p) {
        let bounds = parent.getBoundingClientRect();

        if (parseInt(p.style.left) > bounds.right) {
            speedX *= -1;


        } else if (parseInt(p.style.left) < bounds.left) {
            speedX *= -1;

        }

        if (parseInt(p.style.top) > bounds.bottom) {
            speedY *= -1;

        } else if (parseInt(p.style.top) < bounds.top) {
            speedY *= -1;

        }
    }

    let aniRef = null;
    //add a new particle
    let p2 = document.createElement("div");
    p2.id = "particle_two";
    document.getElementById("parent").appendChild(p2);
    p2.style.left = '500px'
    p2.style.top = '100px';
    let theta = 0;
    aniRef = window.requestAnimationFrame(modifyParticle);

    function modifyParticle() {
        let p2 = document.getElementById("particle_two");
        //map -1 to 1 to between 5 100
        let mappedNum = mapNumRange(Math.sin(theta), -1, 1, 5, 100)
        p2.style.width = (mappedNum) + "px";
        p2.style.height = (mappedNum) + "px";
        p2.style.borderRadius = (mappedNum) + "px";
        theta += 0.05;
        aniRef = window.requestAnimationFrame(modifyParticle);
    }
    //same as map in p5
    const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
        ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    window.addEventListener("keydown", function (e) {
        if (e.code === 'Space') {
            console.log("space");
            this.cancelAnimationFrame(aniRef)

        }
    })

    // window.requestAnimationFrame(animate);

    // function animate() {
    //     let p = document.getElementById("particle");
    //     p.style.left = parseInt(p.style.left) + 2 + "px";
    //     p.style.top = parseInt(p.style.top) + 3 + "px";

    //     window.requestAnimationFrame(animate);
    // }



}