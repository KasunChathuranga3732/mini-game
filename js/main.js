const backElm = document.body.querySelector('#background');
const boxElm = document.createElement('div');
const htmlElm = document.body;
boxElm.classList.add('box');
backElm.appendChild(boxElm);

const scoreBoard = document.createElement('div');
scoreBoard.className = 'score';
scoreBoard.innerText = `Score: 0`;
backElm.appendChild(scoreBoard);



let jump = false;



document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space') {
        jump = true;
    }
});



let a = 0;
setInterval(()=>{
    a++;
    if(!jump){
        drawIdle();
    } else if(jump && (a % 2 === 0)){
        drawJump()
    }
}, 40);


setInterval(()=> {
    if (jump) {
        doJump();
    }
},5);




let idle = 1;
function drawIdle(){
    boxElm.style.backgroundImage = `url('img/Idle (${idle++}).png')`;
    if(idle === 11) idle = 1;
}

let dJump = 1;
function drawJump(){
    boxElm.style.backgroundImage = `url('img/Jump (${dJump++}).png')`;
    if(dJump === 11) dJump = 1;
}




let angle = 0;
function doJump(){
    let y  = Math.cos(angle * (Math.PI / 180));
    y *= 3;
    boxElm.style.top = (boxElm.offsetTop - y) + "px";
    angle++;
    if (angle >  180){
        jump = false;
        angle = 0;
    }
}




