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
    console.log(colorPetalResult);
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
    console.log(irisesWithColorsSorted);

    //task 11
    let irisDiv = document.createElement("div");
    irisDiv.classList.add("iris");
    document.body.appendChild(irisDiv);

    irisDiv.style.position = "absolute";
    irisDiv.style.top = "0";
    irisDiv.style.left = "0";
    irisDiv.style.width = "100%";
    irisDiv.style.height = "100%";
    irisDiv.style.pointerEvents = "none";



    const columns = Math.floor(window.innerWidth / 15);

    function createMatrix() {
        for (let i = 0; i < columns; i++) {
            const column = document.createElement("div");
            column.classList.add("column");
            column.style.left = `${i * 150}px`;

            let text = '';
            for (let j = 0; j < irisesWithColorsSorted.length; j++) {
                console.log(irisesWithColorsSorted[j]);
                text += `<div style="background-color:${irisesWithColorsSorted[j].color}">${JSON.stringify(irisesWithColorsSorted[j])}</div>`;
            }
            column.innerHTML = text;
            irisDiv.appendChild(column);
        }
    }
    createMatrix();
}