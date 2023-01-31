let playertext = document.getElementById('playertext');
let restartbtn = document.getElementById('restartbtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerindicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const o_text="O";
const x_text="X";
let currentplayer = x_text;
let spaces = Array(9).fill(null);

const startgame = () => {
    boxes.forEach(box => box.addEventListener('click',boxclicked));
}
function boxclicked(e){
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentplayer;
        e.target.innerText = currentplayer;
        if(playerwon() !== false){
            playertext = `${currentplayer} has won!`;
            let winning_block = playerwon();
            winning_block.map(box => boxes[box].style.background=winnerindicator);
           
            return;
        }
        currentplayer = currentplayer == x_text ? o_text : x_text;
    }
}
const winningcombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]
function playerwon(){
    for(const condition of winningcombos){
        let [a,b,c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c];
        }
    }
    return false;
}

restartbtn.addEventListener('click',restart);
function restart(){
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor='';
    })
    playertext = 'tic tac toc';
    currentplayer = x_text;
}
startgame();



