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
    console.log(filteredIrises);

    let filterElement = document.getElementById("sepalWidthExample");
    filterElement.textContent = "Properties with sepalWidth >= 4 : " + "\n";
    for (let i = 0; i < filteredIrises.length; i++) {
        filterElement.textContent += JSON.stringify(filteredIrises[i]);
    }

    //task 4 

    let sum;
    dataContext.reduce((acc, element) => {
        console.log(element.petalLength);
        sum = acc + element.petalLength;
        return sum;
    }, 0);

    let average = sum / dataContext.length;

    let petalLengthElement = document.getElementById("petalLengthResult");
    petalLengthElement.textContent = "Average petalLength : " + average;




}