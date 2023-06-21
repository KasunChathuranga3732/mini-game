const backElm = document.body.querySelector('#background');
const boxElm = document.createElement('div');
const htmlElm = document.body;
boxElm.classList.add('box');
backElm.appendChild(boxElm);
const btnStart = $('#btn-start');
const contentElm = $('#content');

const scoreBoard = document.createElement('div');
scoreBoard.className = 'score';
scoreBoard.innerText = `Score: 0`;
backElm.appendChild(scoreBoard);

const frontdiv = document.querySelector('.frontDiv');
const winmsg = document.querySelector('.frontDiv > div:first-child');
backElm.appendChild(frontdiv);
boxElm.style.visibility = 'hidden';
scoreBoard.style.visibility = 'hidden';



let jump = false;
let run = false;
let dx = 0;
let score = 0;
let down = false;
let up = true;
let dead = false;
let moving = false;
const fireElmList = [];
const ballElmList = [];


btnStart.on('click', (eventData)=> {
    moving = true;
    ballElm();
    fireElm();
    boxElm.style.visibility = 'visible';
    scoreBoard.style.visibility = 'visible';
    frontdiv.style.visibility = 'hidden';
    barrierVisible();
});


document.body.addEventListener('keydown', (eventData)=> {
    if(moving) {
        if (eventData.code === 'Space') {
            jump = true;
        } else if (eventData.code === 'ArrowRight') {
            boxElm.style.transform = "";
            run = true;
            dx = 30;
        } else if (eventData.code === 'ArrowLeft') {
            run = true;
            boxElm.style.transform = "rotateY(180deg)";
            dx = -30;
        } else if (eventData.code === 'ArrowDown') {
            down = true;
            up = false;
        } else if (eventData.code === 'ArrowUp') {
            up = true;
        } else if (eventData.code === 'Escape'){
            moving = false;
            run = false;
            jump = false;
            slide = false;
            frontdiv.style.visibility = 'visible';
            boxElm.style.visibility = 'hidden';
            scoreBoard.style.visibility = 'hidden';
            btnStart.text('RESTART');
            barrierHidden();


        }
    }
});

document.body.addEventListener('keyup', (eventData) => {
    if(moving) {
        if (eventData.code === 'ArrowRight') {
            run = false;
            dx = 0;
        } else if (eventData.code === 'ArrowLeft') {
            run = false;
            dx = 0;
        }
    }
});



let a = 0;
setInterval(()=>{
    a++;
    if(!jump && !run && !down && !dead){
        drawIdle();
    } else if(jump && (a % 2 === 0)){
        drawJump()
    } else if(run && (a % 2 === 0)) {
        drawRun();
        boxElm.style.top = 67 + 'vh';
    } else if(down && (a % 7 === 0)){
        drawSlide();
    } else if(dead && (a % 3 === 0)){
        drawDead();
    }

}, 40);


let runspeed = 0
setInterval(()=> {
    runspeed++;
    if (jump){
        doJump();
    }
    if (run && (runspeed % 15 == 0)){
        doRun();
    }
    if (moving){
        moveBackground();
    }
}, 5);


setInterval(()=>{
    if(moving){

        fireElmList.forEach(elm => space(elm, 10));

        score +=10;
        scoreBoard.innerText = `Score: ${score}`;
    }
},40);


setInterval(()=>{
    if(moving) {
        ballElmList.forEach(elm => space(elm, 30));

        if (score === 24000) {
            finish();
        }
    }
},40);


function space(elm, gap){
    if(score < 5000){
        elm.style.left = elm.x - 7 + 'px';
        elm.x = elm.x - 7;
    } else if(score >= 5000 && score < 10000){
        elm.style.left = elm.x - 9 + 'px';
        elm.x = elm.x - 9;
    } else if(score >= 10000 && score < 15000){
        elm.style.left = elm.x - 12 + 'px';
        elm.x = elm.x - 12;
    } else if(score >= 15000 && score < 20000) {
        elm.style.left = elm.x - 15 + 'px';
        elm.x = elm.x - 15;
    } else {
        elm.style.left = elm.x - 18 + 'px';
        elm.x = elm.x - 18;
    }

    let xdiff = (boxElm.offsetLeft + boxElm.offsetWidth/2) - (elm.offsetLeft + elm.offsetWidth/2);
    let ydiff = (boxElm.offsetTop + boxElm.offsetHeight/2) - (elm.offsetTop + elm.offsetHeight/2);

    const hypot = Math.hypot(xdiff, ydiff);
    if(hypot < boxElm.offsetWidth/2 + elm.offsetWidth/2 - gap){
        fail();
    }
}


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

let slide = 1;
function drawSlide(){
    boxElm.style.backgroundImage = `url('img/Slide (${slide++}).png')`;
    boxElm.style.top = 70 +'vh';
    if(slide === 6) {
        down = false;
        up = true;
        slide = 1;
        boxElm.style.top = 70 +'vh';
    }
}

let ddead = 1;
function drawDead(){
    boxElm.style.top = 67 + 'vh';
    if(ddead === 11) {
        ddead = 10;
    }
    boxElm.style.backgroundImage = `url('img/Dead (${ddead++}).png')`;
}

let backgroundImagePosition = 0;
function moveBackground(){
    backgroundImagePosition -= 0.7;
    run = true;
    backElm.style.backgroundPositionX = backgroundImagePosition + 'px';
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


let fireLeft = 1000;
function fireElm(){
    for(let i=0; i<20; i++){
        var fireDiv = document.createElement('div');
        fireDiv.className = 'fire';
        fireDiv.style.left = fireLeft + 'px';
        fireDiv.x = fireLeft;
        document.getElementById('background').appendChild(fireDiv);
        fireElmList.push(fireDiv);
        fireLeft += 1400;
    }
}

let ballLeft = 1700;
function ballElm(){
    for(let i=0; i<20; i++){
        var ballDiv = document.createElement('div');
        ballDiv.className = 'ball';
        ballDiv.style.left = ballLeft + 'px';
        ballDiv.x = ballLeft;
        document.getElementById('background').appendChild(ballDiv);
        ballElmList.push(ballDiv);
        ballLeft += 1400;
    }
}


function barrierHidden(){
    fireElmList.forEach(elm=> elm.style.visibility = 'hidden');
    ballElmList.forEach(elm=> elm.style.visibility = 'hidden');
}

function barrierVisible(){
    fireElmList.forEach(elm=> elm.style.visibility = 'visible');
    ballElmList.forEach(elm=> elm.style.visibility = 'visible');
}

function fail(){
    dead = true;
    moving = false;
    run = false;
    jump = false;
    slide = false;
    setTimeout(() => {
        winmsg.innerText = `Fail
                            Your Score: ${score}`
        frontdiv.style.visibility = 'visible';
        boxElm.style.visibility = 'hidden';
        scoreBoard.style.visibility = 'hidden';
        contentElm.css('visibility', 'hidden');
        barrierHidden();
    }, 3000);
    setTimeout(() => {
        btnStart.text('Reload');
        location.reload();
    },5000);
}

function finish(){
    moving = false;
    run = false;
    jump = false;
    slide = false;

    winmsg.innerText = `You Won the GAME
                            Your Score: ${score}`
    frontdiv.style.visibility = 'visible';
    boxElm.style.visibility = 'hidden';
    scoreBoard.style.visibility = 'hidden';
    contentElm.css('visibility', 'hidden');
    barrierHidden();

    setTimeout(() => {
        btnStart.text('Reload');
        location.reload();
    },5000);
}




