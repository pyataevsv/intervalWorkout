/* eslint-disable no-useless-escape */
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
        if (Object.getOwnPropertyNames(frame[i])[0] !== sr) {
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

export function mobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};