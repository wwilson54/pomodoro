const buttons = document.querySelectorAll('button');
let workMinRemaining;
let workSecRemaining;
let workTime;
let breakMinRemaining;
let breakSecRemaining;
let breakTime;
let timerRunning = false;
let timerPaused = false;
let onBreak = false;
let countDownID;

function setTime(workMin,breakMin) {
    if(timerRunning || timerPaused) {
        return;
    }
    else {
        workMinRemaining = workMin;
        workSecRemaining = 0;
        breakMinRemaining = breakMin;
        breakSecRemaining = 0;
        workTime = workMin;
        breakTime = breakMin;
        refreshDisplay();
        updateSettings();
    }
}

function toText (min,sec) {
    let minText = '';
    let secText = '';
    if (min < 10) {
        minText = '0' + min.toString();
    }
    else {
        minText = min.toString();
    }
    if (sec < 10) {
        secText = '0' + sec.toString();
    }
    else {
        secText = sec.toString();
    }
    return minText + ':' + secText;
}

function updateSettings() {
    document.querySelector('#workTime').textContent = toText(workTime,0);
    document.querySelector('#breakTime').textContent = toText(breakTime,0);
}

function refreshDisplay() {
    if(onBreak) {
        document.querySelector('#display').textContent = toText(breakMinRemaining,breakSecRemaining);
        document.querySelector('#status').textContent = 'On Break';
    }
    else {
        document.querySelector('#display').textContent = toText(workMinRemaining,workSecRemaining);
        document.querySelector('#status').textContent = 'Working';
    }
    console.log(workMinRemaining + ',' + workSecRemaining);
    console.log(timerRunning,",",timerPaused)
}

function incWork () {
    workTime ++;
    if (workTime > 60) {
        workTime = 60;
    }
    setTime(workTime,breakTime)
}

function decWork () {
    workTime--;
    if (workTime < 1) {
        workTime = 1;
    }
    setTime(workTime,breakTime)
}

function incBreak () {
    breakTime++;
    if (breakTime > 60) {
        breakTime = 60;
    }
    setTime(workTime,breakTime)
}

function decBreak () {
    breakTime--;
    if (breakTime < 1) {
        breakTime = 1;
    }
    setTime(workTime,breakTime)
}

function startTimer (){
    clearInterval(countDownID);
    timerRunning = true;
    timerPaused = false;
    countDownID = setInterval(countDown,1000);
}

function countDown () {
    if(onBreak) {
        if(breakSecRemaining === 1 && breakMinRemaining === 0) {
            breakSecRemaining = 0;
            refreshDisplay();
            onBreak = false;
            breakMinRemaining = breakTime;
        }
        else if (breakSecRemaining === 0) {
            breakSecRemaining = 59;
            breakMinRemaining --;
            refreshDisplay();
        }
        else {
            breakSecRemaining --;
            refreshDisplay();
        }
    }
    else {
        if(workSecRemaining === 1 && workMinRemaining === 0) {
            workSecRemaining = 0;
            refreshDisplay();
            onBreak = true;
            workMinRemaining = workTime;
        }
        else if (workSecRemaining === 0) {
            workSecRemaining = 59;
            workMinRemaining --;
            refreshDisplay();
        }
        else {
            workSecRemaining --;
            refreshDisplay();
        }
    }
}

function pauseTimer () {
    if(!timerPaused && timerRunning) {
        timerPaused = true;
        clearInterval(countDownID);
    }
    else if(timerPaused && timerRunning){
        timerPaused = false;
        startTimer();
    }
    else {
        timerPaused = false;
    }
}

function resetTimer () {
    timerPaused = false;
    timerRunning = false;
    onBreak = false;
    if(countDownID) {
        clearInterval(countDownID);
    }
    setTime(25,5);
}

function stopTimer () {
    timerPaused = false;
    timerRunning = false;
    onBreak = false;
    if(countDownID) {
        clearInterval(countDownID);
    }
    setTime(workTime,breakTime);
}

function buttonPressed(obj) {
    switch (obj.id) {
        case 'incWork':
            incWork();
            break;
        case 'decWork':
            decWork();
            break;
        case 'incBreak':
            incBreak();
            break;
        case 'decBreak':
            decBreak();
            break;
        case 'startTimer':
            startTimer();
            break;
        case 'pauseTimer':
            pauseTimer();
            break;
        case 'stopTimer':
            stopTimer();
            break;
        case 'resetTimer':
            resetTimer();
            break;
    }
}

for(let i = 0;i < buttons.length; i++) {
    buttons[i].addEventListener('click',function(e){buttonPressed(this)});
}

//initialize the timer
setTime(25,5);
