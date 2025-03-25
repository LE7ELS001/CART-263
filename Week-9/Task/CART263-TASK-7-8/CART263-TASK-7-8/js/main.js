window.onload = async function () {
    console.log("task 7-8");


    //task 1 
    let response = await fetch("data/iris.json");
    let dataContext = await response.json();

    let contextArray = []
    Object.keys(dataContext).forEach(key => {
        let properties = Object.keys(dataContext[key]);
        contextArray.push(properties);

    });

    let propertiesNameArray = [];

    contextArray.forEach(Array => {
        Array.forEach(name => {
            if (!propertiesNameArray.includes(name)) {
                propertiesNameArray.push(name);
            }
        })
    });



    let propertiesElement = document.getElementById("propertiesName");
    propertiesElement.textContent = "Properties : " + propertiesNameArray.join(" - ");



    //taske 2

    let possibleColor = ["#5d3fd3", "#a73fd3", "#d33fb5", "#d35d3f", "#d3a73f"];

    let irisesWithColors = dataContext.map(element => {
        let randomColor = possibleColor[Math.floor(Math.random() * possibleColor.length)];

        return { ...element, color: randomColor };
    })



    let colorElement = document.getElementById("colorExample");
    colorElement.textContent = "Properties with color : " + Object.keys(irisesWithColors[0]).join(" - ");


    //task 3    
    let filteredIrises = irisesWithColors.filter(element => element.sepalWidth >= 4);
    //console.log(filteredIrises);

    let filterElement = document.getElementById("sepalWidthExample");
    filterElement.textContent = "Properties with sepalWidth >= 4 : " + "\n";
    for (let i = 0; i < filteredIrises.length; i++) {
        filterElement.textContent += JSON.stringify(filteredIrises[i]);
    }

    //task 4 

    let sum;
    dataContext.reduce((acc, element) => {
        //console.log(element.petalLength);
        sum = acc + element.petalLength;
        return sum;
    }, 0);

    let average = sum / dataContext.length;

    let petalLengthElement = document.getElementById("petalLengthResult");
    petalLengthElement.textContent = "Average petalLength : " + average;

    //task 5 
    let colorPetalResult = irisesWithColors.find(petals => petals.petalWidth > 1)

    let colorPetalElement = document.getElementById("colorPetalResult");
    //console.log(colorPetalResult);
    colorPetalElement.textContent = "Petal Width > 1 : " + JSON.stringify(colorPetalResult);


    //task 6 & 7
    let petalLengthResult1 = irisesWithColors.some(petals => petals.petalLength > 10);
    let petalLengthElement2 = irisesWithColors.some(petals => petals.petalLength === 4.2);

    let petalLengthResultElement1 = document.getElementById("somePetalLengthResult1");
    petalLengthResultElement1.textContent = "Petal Length > 10 : " + (petalLengthResult1 ? "Exist" : "Not Exist");

    let petalLengthResultElement2 = document.getElementById("somePetalLengthResult2");
    petalLengthResultElement2.textContent = "Petal Length = 4.2 : " + (petalLengthElement2 ? "Exist" : "Not Exist");

    //task 8 & 9
    let petalWidthResult1 = irisesWithColors.every(petals => petals.petalWidth < 3);
    let petalWidthResult2 = irisesWithColors.every(petals => petals.petalWidth > 1.2);

    let petalWidthElement1 = document.getElementById("allPetalWidthResult");
    petalWidthElement1.textContent = "Petal Width < 3 : " + (petalWidthResult1 ? "Exist" : "Not Exist");

    let petalWidthElement2 = document.getElementById("allPetalWidthResult2");
    petalWidthElement2.textContent = "Petal Width > 1.2 : " + (petalWidthResult2 ? "Exist" : "Not Exist");

    //task 10
    let irisesWithColorsSorted = irisesWithColors.sort((a, b) => a.petalWidth - b.petalWidth);
    //console.log(irisesWithColorsSorted);

    //task 11
    let irisCanvas = document.createElement("canvas");
    irisCanvas.classList.add("iris");
    irisCanvas.style.width = "100%";
    irisCanvas.style.height = "100%";
    const context = irisCanvas.getContext("2d");

    irisCanvas.width = window.innerWidth;
    irisCanvas.height = window.innerHeight;





    const fontSize = 40;
    let fontColor = '#0F0';
    const columns = window.innerWidth / fontSize;
    const rainDrop = [];

    const matrixColors = [
        '#FF0000',
        '#FFFF00',
        '#800080',
        '#0000FF',
        '#0F0'
    ];

    for (let i = 0; i < columns; i++) {
        rainDrop[i] = 1;
    }

    const columnData = [];
    for (let i = 0; i < columns; i++) {
        columnData[i] = irisesWithColorsSorted[i % irisesWithColorsSorted.length];
    }

    console.log(irisesWithColorsSorted[0]);

    document.body.appendChild(irisCanvas);

    let frameCounter = 0;
    const speedFactor = 5;
    let PlayAnimation = true;
    let animationID = null;


    function draw(color) {

        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, irisCanvas.width, irisCanvas.height);
        context.fillStyle = color;
        context.font = `${fontSize}px monospace`;
        //context.textBaseline = "top";

        frameCounter++;

        for (let i = 0; i < rainDrop.length; i++) {
            const dataObject = columnData[i];
            const text = JSON.stringify(dataObject);

            context.fillText(text, i * fontSize, rainDrop[i] * fontSize);

            if (frameCounter % speedFactor === 0) {

                if (rainDrop[i] * fontSize > irisCanvas.height && Math.random() > 0.975) {
                    rainDrop[i] = 0;
                }
                rainDrop[i]++;
            }
        }
        if (PlayAnimation) {
            animationID = requestAnimationFrame(() => draw(fontColor));
        }
    }
    // setInterval(draw(fontColor), 300);


    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.key === " " && PlayAnimation) {
            PlayAnimation = false;
            cancelAnimationFrame(animationID);
        }
    });

    document.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (event.key === " ") {
            PlayAnimation = true;
            draw(fontColor);
        }
    });

    document.addEventListener("dblclick", (event) => {
        const randomColor = matrixColors[Math.floor(Math.random() * matrixColors.length)];
        fontColor = randomColor;
        console.log(fontColor);

    });
}


// report for task 1 - 10
// Properties: sepalLength - sepalWidth - petalLength - petalWidth - species
// Properties with color : sepalLength - sepalWidth - petalLength - petalWidth - species - color
// Properties with sepalWidth >= 4 :
// { "sepalLength": 5.8, "sepalWidth": 4, "petalLength": 1.2, "petalWidth": 0.2, "species": "setosa", "color": "#a73fd3" } { "sepalLength": 5.7, "sepalWidth": 4.4, "petalLength": 1.5, "petalWidth": 0.4, "species": "setosa", "color": "#5d3fd3" } { "sepalLength": 5.2, "sepalWidth": 4.1, "petalLength": 1.5, "petalWidth": 0.1, "species": "setosa", "color": "#d3a73f" } { "sepalLength": 5.5, "sepalWidth": 4.2, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa", "color": "#d35d3f" }
// Average petalLength: 3.7580000000000027
// Petal Width > 1 : { "sepalLength": 7, "sepalWidth": 3.2, "petalLength": 4.7, "petalWidth": 1.4, "species": "versicolor", "color": "#d3a73f" }
// Petal Length > 10 : Not Exist
// Petal Length = 4.2 : Exist
// Petal Width < 3 : Exist
// Petal Width > 1.2 : Not Exist