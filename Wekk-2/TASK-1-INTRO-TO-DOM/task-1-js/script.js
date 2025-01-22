window.onload = setup;

/** function setup */
function setup() {
    console.log("we are a go!")
    console.log("=========================Task 1======================");
    /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
    /*** START PART ONE ACCESS */
    /* 1: all paragraph elements */
    /***CODE */
    /***OUTPUT:
     * NodeList(9)
     */
    let allPElement = document.querySelectorAll("p");
    console.log(allPElement);


    /*************************************** */
    /* 2: only the first paragraph element */
    /***CODE */
    /***OUTPUT:
     * <p id = '1'> ... </P>
     */

    let firstPElement = document.querySelector("p");
    console.log(firstPElement);


    /*************************************** */
    /* 3: all elements with the class inner-container */
    /***CODE */
    /***OUTPUT:
     * NodeList(8)
     */
    let allElementIC = document.querySelectorAll(".inner-container");
    console.log(allElementIC);

    /*************************************** */
    /* 4: the last image element inside the element that has the class img-container */
    /***CODE */
    /***OUTPUT:
     * <div class = "img-container"> ... </div>
     */
    let imageLength = document.querySelectorAll(".img-container").length - 1;
    let lastImageElement = document.querySelectorAll(".img-container")[imageLength];
    console.log(lastImageElement);


    /*************************************** */
    /* 5A: all h2 elements */
    /* 5B: length of the list in 5A */
    /* 5C: the text content of the first element in the list from 5A */
    /***CODE */
    /***OUTPUT:
     *  NodeList(1)
     * 1
     *  The header of this fancy page
     */

    let h2Element = document.querySelectorAll("h2");
    console.log(h2Element);
    console.log(h2Element.length);
    console.log(h2Element[0].textContent);



    /*************************************** */
    /* 6: the element with id name parent */
    /***CODE */
    /***OUTPUT:
     * NodeList(1)
     */

    let elementIDParent = document.querySelectorAll("#parent");
    console.log(elementIDParent);

    /*************************************** */
    /*** END PART ONE ACCESS */

    console.log("=========================Task 2======================");

    /*************************************** */
    /*** START PART TWO MODIFY */
    /*************************************** */
    /* 1: Select the first paragraph and replace the text within the paragraph... */
    /***CODE */


    document.querySelectorAll("p")[0].textContent = "New text in paragraph one: text changed by Junming on the following date: 2025/1/21."
    // console.log(document.querySelectorAll("p")[0].textContent);

    /*************************************** */

    /* 2: Select all elements in the HTML that have the class name content-container
     and change the background color ... of first and second ...*/
    /***CODE */

    document.querySelectorAll(".content-container")[0].style.background = "orange";
    document.querySelectorAll(".content-container")[1].style.background = "purple";


    /*************************************** */
    /* 3: Change the src element of the first image element on the page to be ...
    /***CODE */

    document.querySelector("img").src = "task-1-images/seven.png";
    console.log(document.querySelector("img"));
    /*************************************** */
    /* 4: Select the third paragraph element on the page and
    replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
    /***CODE */

    document.querySelectorAll("p")[2].innerHTML = "<h2> TEST 123 </h2>";
    // console.log(document.querySelectorAll("p")[2]);

    /*************************************** */
    /* 5: Select the fourth paragraph element on the page and
    add to the existing content an h2 element containing the text `TEST 123`
    /***CODE */

    document.querySelectorAll("p")[3].innerHTML += "<h2> TEST 123 </h2>";
    // console.log(document.querySelectorAll("p")[3].innerHTML);

    /*************************************** */
    /* 6: Select the fifth paragraph element on the page and add to the existing content
    an img element that holds `one.png`, and add the class newStyle to said paragraph element.
    /***CODE */
    let newImg = document.createElement("img");
    document.querySelectorAll("p")[4].classList.add('newStyle');
    newImg.src = "task-1-images/one.png";

    document.querySelectorAll("p")[4].appendChild(newImg);





    /*************************************** */
    /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];,
    then access all elements with class name inner-container and save to a variable called `innerContainers`. 
    Next, iterate over the colors array, and for each color: 
    assign the element from innerContainers variable with the same index 
    (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
    a background using that color.
    /***CODE */




    let colors = ['red', 'blue', 'green', 'orange'];
    let innerContainer = document.querySelectorAll('.inner-container');
    //console.log(innerContainer.length);

    let colorsLength = colors.length;
    for (let i = 0; i < colorsLength; i++) {
        innerContainer[i].style.background = colors[i];
    }




    /*************************************** */
    /*** END PART TWO MODIFY */

    console.log("=========================Task 3======================");
    /*************************************** */
    /*** START PART THREE CREATE */
    /*************************************** */
    /* 1: NEW PARAGRAPHS */
    /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
    /* 1B: Create a function:function customCreateElement(parent){ //body } */
    /* 1C:  In the body of customCreateElement create a new parargraph element*/
    /* 1D:  Set the text of this element to be : `using create Element`*/
    /* 1E:  Set the background of this paragraph element to be green */
    /* 1F:  Set the color of the text in this paragraph element to be white */
    /* 1G: Append this new element to the parent variable within the function. */
    /* 1H: Iterate through the allPTagsThree array and call customCreateElement(),
    passing the current allPTagsThree element as the parent with each iteration.*/
    /***CODE */

    let allPTagsTree = document.querySelectorAll('p');
    let tagsLength = allPTagsTree.length;
    // console.log(tagsLength);
    for (let i = 0; i < tagsLength; i++) {
        customCreateElement(allPTagsTree[i]);
    }


    function customCreateElement(parent) {
        let newElement = document.createElement('p');
        newElement.textContent = 'using create Element';
        newElement.style.background = 'green';
        newElement.style.color = 'white';
        parent.appendChild(newElement);
    }

    /***EXPLANATION::
     * 
     * 
     */

    /*************************************** */
    /* 2: GRID OF BOXES */
    /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
    /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv.
    /* 2C:Then append this new element to the parent variable within the function. 
    /* 2D:Finally, return</code> this new element */
    /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)).
        Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
        Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
    /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense...
        Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
        in a variable i.e. returnedDiv. 
        Set the style (left and top) to the of this element to 
        the necessary x and y position (use the counter variables in the for nested for loop to 
        calculate the new positions.
    /* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
        and otherwise let it have a background of purple.</li>
    /* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
        otherwise lat it have the content `ODD`.*/

    /***CODE */

    // let grid = document.querySelector('#new-grid');
    // console.log(grid);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let returnDiv = customNewBoxCreate(document.querySelector('#new-grid'));

            //change the grid position 

            // let topValue = i * 40
            // let topString = topValue + 'px';
            // let leftValue = j * 40
            // let leftString = leftValue + 'px';
            // returnDiv.style.top = topString;
            // returnDiv.style.left = leftString;

            returnDiv.style.top = `${i * 40}px`;
            returnDiv.style.left = `${j * 40}px`;

            //change background color according to row is even or odd
            if (i % 2 === 0) {
                returnDiv.textContent = 'EVEN'
                returnDiv.style.background = 'white'
            } else {
                returnDiv.textContent = 'ODD'
                returnDiv.style.background = 'cornflowerblue'
            }

        }
    }
    let numTestDiv = document.querySelectorAll('.testDiv');
    console.log(numTestDiv.length);

    function customNewBoxCreate(parent) {
        let newBox = document.createElement('div');
        newBox.classList.add('testDiv');
        parent.appendChild(newBox);
        return newBox;
    }






    /***EXPLANATION::
     * 100 
     * because 10 * 10 (rows *  cols)
     * 
     */

    /*************************************** */
    /* 3: GRID OF BOXES II */

    /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ...
        USE the same customNewBoxCreate function..., the only difference is that the parent element 
        for each of these new divs is the element whose id is `new-grid-three`. */
    /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder),
        when it is a column where the remainder is 1 or when the remainder is 2 ... 
        HINT:: look up the % operator.. */
    /* 3C: Then for each of the above cases: give the new divs in the first case a background of red,
            then the second a background of orange and the third yellow. */
    /*  3D: Finally, let each div contain the text content representing the associated remainder
        when dividing by three. */

    /***CODE */

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let returnDiv = customNewBoxCreate(document.querySelector('#new-grid-three'));

            //change the grid position

            // let topValue = i * 40
            // let topString = topValue + 'px';
            // let leftValue = j * 40
            // let leftString = leftValue + 'px';
            // returnDiv.style.top = topString;
            // returnDiv.style.left = leftString;

            returnDiv.style.top = `${i * 40}px`;
            returnDiv.style.left = `${j * 40}px`;


            let remainderNumber = check3Remainder(j);
            returnDiv.textContent = `${remainderNumber}`
            if (remainderNumber === 0) {
                returnDiv.style.background = 'red';
            }
            else if (remainderNumber === 1) {
                returnDiv.style.background = 'orange';
            }
            else if (remainderNumber === 2) {
                returnDiv.style.background = 'yellow';
            }

        }
    }

    function check3Remainder(number) {
        let result = number % 3;
        return result;
    }
    /***EXPLANATION::
     * 
     * 
     */

    /*************************************** */
    /*** END PART THREE CREATE */
    /*************************************** */





}