export function makeFrame(preset) {

    let frame = [];
    frame.push({ timeOn: { round: 1, ex: 1, exName: preset.exs[0], set: 1 } });

    for (let i = 0; i < preset.sets - 1; i++) {
        frame.push({ timeOff: { round: 1, ex: 1, exName: preset.exs[0], set: i + 1 } })
        frame.push({ timeOn: { round: 1, ex: 1, exName: preset.exs[0], set: i + 2 } })
    }

    let base = JSON.parse(JSON.stringify(frame));

    for (let i = 0; i < preset.exs.length - 1; i++) {

        frame.push({ 'exRestTime': { round: 1, ex: 1, exName: preset.exs[i + 1], set: 0 } });
        base.forEach(element => {
            if (Object.getOwnPropertyNames(element)[0] === 'timeOn') {
                element.timeOn.exName = preset.exs[i + 1];
                element.timeOn.ex = i + 1;
            }

            if (Object.getOwnPropertyNames(element)[0] === 'timeOff') {
                element.timeOff.exName = preset.exs[i + 1];
                element.timeOff.ex = i + 1;
            }
        });

        frame = frame.concat(base);
    }

    base = JSON.parse(JSON.stringify(frame));

    for (let i = 0; i < preset.rounds - 1; i++) {
        frame.push({ 'roundRestTime': { round: 1, ex: '', exName: ' ', set: 0 } });
        base.forEach(element => {
            element[Object.getOwnPropertyNames(element)[0]].round = i + 2;
        });
        frame = frame.concat(base);
    }
    frame.unshift({ 'warmUp': { round: 1, ex: 1, exName: preset.exs[0], set: 1 } });

    //console.log(frame)

    return frame;
}


export function getAllTime(preset) {

    const frame = makeFrame(preset);
    let res = frame.reduce((prev, item) => prev + preset[Object.getOwnPropertyNames(item)[0]], 0);
    //console.log(res)
    return res;
}

export function toMmSs(sec) {
    let mm = (('' + Math.floor(sec / 60)).length === 1) ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60);
    let ss = (('' + sec % 60).length === 1) ? '0' + sec % 60 : sec % 60;
    return mm + ':' + ss;
}


export function makeSsFrame(preset) {

    let frame = [];
    frame.push({ timeOn: { round: 1, ex: 1, exName: preset.exs[0], set: 1, time: preset.timeOn } });

    for (let i = 0; i < preset.sets - 1; i++) {
        frame.push({ timeOff: { round: 1, ex: 1, exName: preset.exs[0], set: i + 1, time: preset.timeOff } })
        frame.push({ timeOn: { round: 1, ex: 1, exName: preset.exs[0], set: i + 2, time: preset.timeOn } })
    }

    let base = JSON.parse(JSON.stringify(frame));


    for (let i = 0; i < preset.exs.length - 1; i++) {
        frame.push({ 'exRestTime': { round: 1, ex: i + 1, exName: preset.exs[i], set: 0, time: preset.exRestTime } });
        base = JSON.parse(JSON.stringify(base));
        base.forEach(element => {
            if (Object.getOwnPropertyNames(element)[0] === 'timeOn') {
                element.timeOn.exName = preset.exs[i + 1];
                element.timeOn.ex = i + 2;

            }

            if (Object.getOwnPropertyNames(element)[0] === 'timeOff') {
                element.timeOff.exName = preset.exs[i + 1];
                element.timeOff.ex = i + 2;
            }
        });

        frame = frame.concat(base);
    }

    base = JSON.parse(JSON.stringify(frame));

    for (let i = 0; i < preset.rounds - 1; i++) {
        frame.push({ 'roundRestTime': { round: i + 1, ex: '', exName: ' ', set: 0, time: preset.roundRestTime } });
        base = JSON.parse(JSON.stringify(base));
        base.forEach(element => {
            element[Object.getOwnPropertyNames(element)[0]].round = i + 2;
        });
        frame = frame.concat(base);
    }
    frame.unshift({ 'warmUp': { round: 0, ex: 0, exName: preset.exs[0], set: 0, time: preset.warmUp } });

    let arr = [];


    frame.forEach((item) => {
        //console.log(item)
        for (let i = item[Object.getOwnPropertyNames(item)[0]].time - 1; i >= 0; i--) {
            let newItem = JSON.parse(JSON.stringify(item));
            newItem[Object.getOwnPropertyNames(item)[0]].time = i;
            arr.push(newItem);

        }
    })

    return arr;
}

export function makeExFrame(frame, config) {
    let newFrame = [];
    let sr = 1;
    for (let i = 0; i < frame.length; i++) {
        if (Object.getOwnPropertyNames(frame[i])[0] != sr) {
            newFrame.push(
                {
                    status: Object.getOwnPropertyNames(frame[i])[0],
                    time: frame[i][Object.getOwnPropertyNames(frame[i])[0]].time,
                    exName: frame[i][Object.getOwnPropertyNames(frame[i])[0]].exName
                })
        }
        sr = Object.getOwnPropertyNames(frame[i])[0]
    }
    return newFrame
}

export function toSec(mmss) {
    return Number(mmss.slice(0, 2)) * 60 + Number(mmss.slice(3))
}

export function setCaretPosition(ctrl, pos) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);

        // IE8 and below

    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}