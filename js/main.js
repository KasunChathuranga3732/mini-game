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
let run = false;
let dx = 0;
let score = 0;



document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space') {
        jump = true;
    } else if (eventData.code === 'ArrowRight'){
        boxElm.style.transform = "";
        run = true;
        dx = 30;
    }else if (eventData.code === 'ArrowLeft'){
        run = true;
        boxElm.style.transform = "rotateY(180deg)";
        dx = -30;
    }
});

document.body.addEventListener('keyup', (eventData) => {
        if (eventData.code === 'ArrowRight'){
            run = false;
            dx = 0;
        }else if (eventData.code === 'ArrowLeft'){
            run = false;
            dx = 0;
        }
});



let a = 0;
setInterval(()=>{
    a++;
    if(!jump && !run){
        drawIdle();
    } else if(jump && (a % 2 === 0)){
        drawJump()
    } else if(run && (a % 2 === 0)) {
        drawRun();
        boxElm.style.top = 67 + 'vh';
    }
}, 40);


setInterval(()=> {
    if (jump) {
        doJump();
    } else if (run) {
        doRun();
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

let move = 1;
function drawRun(){
    boxElm.style.backgroundImage = `url('img/Run (${move++}).png')`;
    if(move === 9) move = 1;
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

function doRun(){
    let x = boxElm.offsetLeft + dx;
    if ((x + boxElm.offsetWidth)> innerWidth) {
        x = innerWidth - boxElm.offsetWidth;
    }else if (x <= 0) x = 0;
    boxElm.style.left = `${x}px`;
}




