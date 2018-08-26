var varTimersActive = 0;
var arr60Timers = [0, 0, 0, 0];
var var15Timer = 0;

function timerAddStart() {
    addOneTimer();
    if (varTimersActive === 0) {
        var varTimerInterval = setInterval(varTimer, 200);
    }
}

function addOneTimer() {
    arr60Timers[3] = Date.now() + 3600000;
    var15Timer = Date.now() + 900000;
    actDeactTimers();
}

function visHidTimers(numb, visibi) {
    document.getElementById("timerText0" + numb + "").style.visibility = "" + visibi + "";
    document.getElementById("timerBar0" + numb + "").style.visibility = "" + visibi + "";
    document.getElementById("timerBackspace0" + numb + "").style.visibility = "" + visibi + "";
}

function actDeactTimers() {
    sortTimers();
    for (i = 0; i < 4; i++) {
        if (arr60Timers[i] !== 0) {
            visHidTimers(i + 1, 'visible');
        } else if (arr60Timers[i] === 0) {
            visHidTimers(i + 1, 'hidden');
        }
    }
    if (var15Timer !== 0) {
        visHidTimers(5, 'visible');
    } else if (var15Timer === 0) {
        visHidTimers(5, 'hidden');
    }

}

function formatMs(milli) {
    milli = milli - Date.now();
    var min = Math.floor(milli / (60 * 1000));
    var sec = ((milli % (60 * 1000)) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? '0' : '') + sec;
}

function sortTimers() {
    arr60Timers.sort();
    arr60Timers.reverse();
}

function checkTimers() {
    for (i = 0; i < 4; i++) {
        if (Date.now() > arr60Timers[i]) {
            arr60Timers[i] = 0;
            actDeactTimers();
        }
    }
    if (Date.now() > var15Timer) {
        var15Timer = 0;
        actDeactTimers();
    }
}

function removeTimer(numb) {
    if (numb === 5) {
        var15Timer = 0;
    } else {
        arr60Timers[numb - 1] = 0;
    }
    actDeactTimers();
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function msToPercent(futureMillis, totMinutes, precision) {
    return round(((futureMillis - Date.now()) / (totMinutes * 600)), precision);
}

function varTimer() {
    varTimersActive = 1;
    checkTimers();

    for (i = 0; i < 4; i++) {
        if (arr60Timers[i] !== 0) {
            document.getElementById("timerBar0" + (i + 1) + "").style.width = msToPercent(arr60Timers[i], 60, 1) + "%";
            document.getElementById("timerText0" + (i + 1) + "").style.left = "calc(" + msToPercent(arr60Timers[i], 60, 1) + "% - 27px";
            document.getElementById("timerText0" + (i + 1) + "").innerHTML = formatMs(arr60Timers[i]);
        }
        if (var15Timer !== 0) {
            document.getElementById("timerBar05").style.width = msToPercent(var15Timer, 15, 1) + "%";
            document.getElementById("timerText05").style.left = "calc(" + msToPercent(var15Timer, 15, 1) + "% - 27px";
            document.getElementById("timerText05").innerHTML = formatMs(var15Timer);
        }
    }
}