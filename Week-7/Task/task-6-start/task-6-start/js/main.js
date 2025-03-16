window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");
    let raw_rainbow_text = "";
    try {
      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      let response = await fetch("files/rainbow.txt");
      let raw_rainbow_text = await response.text();
      let words = textColor(raw_rainbow_text);
      //console.log(rainbowText);
      document.querySelector("#stepOneButton").style.display = "none";
      document.querySelector("#inputDiv").style.display = "block";
      //document.querySelector("#rainbow_text").textContent = raw_rainbow_text;
      document.querySelector("#rainbow_text").innerHTML = words;
      runPartB(raw_rainbow_text);
    } catch (e) { }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

    /* FILL IN HERE */
    function producePoem() {
      //console.log(originalRainBowText)
      //get userInput
      let userInput = document.querySelector("#phrase").value;

      //split userInput 
      let phrase_as_array = userInput.split(/[.?!\n\s]/);
      //console.log(phrase_as_array);

      //split Text
      let rainbow_tokens = originalRainBowText.split(/[.?!\n\s]/);
      //console.log(rainbow_tokens);

      //SR
      runPartC(rainbow_tokens, phrase_as_array);

    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    //console.log(rainbow_words);
    //console.log(seed_phrase_array);

    let userInputLength = seed_phrase_array.length;
    let textLength = rainbow_words.length;
    let poem_sentence = "";

    for (let i = 0; i < userInputLength; i++) {
      let word = seed_phrase_array[i];
      let wordLength = word.length;
      for (let k = 0; k < wordLength; k++) {

        let nextChar = word.charAt(k);
        //console.log(nextChar);
        for (let j = 0; j < textLength; j++) {
          let textWord = rainbow_words[j];
          let textNextChar = textWord.charAt(k);
          //console.log(textNextChar);

          if (textNextChar === nextChar) {
            if (poem_sentence === "") {
              poem_sentence += textWord;
              break;
            }
            else {
              poem_sentence += " " + textWord;
              break;
            }
          }
        }

      }

    }
    //console.log(poem_sentence);


    //to next stage
    runPartD(poem_sentence);
  }


  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {

  }

  /****** PART E:: RESET  */
  function resetPoem() {
    /*** TO FILL IN */

  }
} //window onload


function textColor(text) {
  let words = text.split(" ")
  let wordsLength = words.length;
  let colorWordArray = [];

  for (let i = 0; i < wordsLength; i++) {
    let coloredWord = `<span style="color: ${randomColor()}">${words[i]}</span>`;
    colorWordArray.push(coloredWord);
  }

  let result = colorWordArray.join(" ");
  return result;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`
}