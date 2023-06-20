const backElm = document.body.querySelector('#background');
const boxElm = document.createElement('div');
const htmlElm = document.body;
boxElm.classList.add('box');
backElm.appendChild(boxElm);

const scoreBoard = document.createElement('div');
scoreBoard.className = 'score';
scoreBoard.innerText = `Score: 0`;
backElm.appendChild(scoreBoard);




setInterval(()=> {
    drawIdle();
}, 40);





let idle = 1;
function drawIdle(){
    boxElm.style.backgroundImage = `url('img/Idle (${idle++}).png')`;
    if(idle === 11) idle = 1;
}