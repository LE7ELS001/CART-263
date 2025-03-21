window.onload = async function () {
    console.log("task 7-8");

    let response = await fetch("data/iris.json");
    let dataContext = await response.json();

    let propertiesArray = []
    Object.keys(dataContext).forEach(key => {
        let properties = Object.keys(dataContext[key]);
        propertiesArray.push(properties);

    });

    let tmpArray = propertiesArray.reduce((Arr, value) => {
        if (!Arr.includes(value)) {
            Arr.push(value);
        }
        return Arr
    }, []);

    console.log(tmpArray);


}