let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector("#reset-btn")
let winner = document.querySelector(".winner h1")

let turnO = true;//playerX //playerO

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was cliked");

        if (turnO) {//playerO
            box.innerText = "O"
            turnO = false;
            box.style.color="blue"
        }
        else {//playerX
            box.innerText = "X"
            turnO = true;
            box.style.color="black"
        }
        box.disabled = true
        checkWinner();
    })
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winner.innerText = "Congratulation!  The Winner is " + pos1
                disableBoxes();
            }
        }

    }
}


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled= true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled= false;
    }
}

resetbtn.addEventListener("click",()=>{
      turnO = true;
    enableBoxes();
    for (let box of boxes) {
        box.innerText="";
    }
    winner.innerText="";
})