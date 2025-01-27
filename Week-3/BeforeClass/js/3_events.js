window.onload = setup;
function setup() {
    console.log("events!")
}

let introSection = document.querySelector("#intro");
console.log(introSection);
introSection.addEventListener("click", function (e) {
    // console.log(this);
    // console.log(e);
    console.log(document.querySelector(`#${this.id} p`));
    document.querySelector(`#${this.id} p`).style.background = `rgba(125, 239, 110, 0.75)`;

    //a:
    this.style.background = `rgba(214, 110, 239, 0.5)`
});