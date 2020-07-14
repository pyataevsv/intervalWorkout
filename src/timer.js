import { makeSsFrame, makeExFrame } from './script/foos'

export function Timer(obj, setState) {

    const preset = Object.assign({}, obj);

    this.timeRemain = preset.warmUp;

    let frame = makeSsFrame(preset);


    this.allTime = frame.length;

    this.currentElement = frame[0];

    this.setPresets = () => {
        setState({ allTime: this.allTime, frame: frame, exFrame: makeExFrame(frame) });
    }


    this.start = () => {

        setState({ status: 'start' });

        if (this.allTime !== 0) tick();
    }


    this.stop = () => {
        clearInterval(this.timerId);
        this.allTime = this.timeToEnd;
        setState({ status: 'pause' });
    }

    this.reset = () => {
        this.stop();
        this.timeRemain = preset.warmUp;
        this.currentElement = frame[0];
        // setState({ config: obj });
        // setState({ timeRemain: this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]].time + 1, allTime: this.timeToEnd - 1 });
        // setState({ status: 'pause' });
        this.allTime = frame.length;
        // setState({ allTime: this.allTime });

        setState(
            {
                timeRemain: this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]].time + 1,
                allTime: this.allTime,
                status: 'pause',
                indicators: Object.assign({}, this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]], { status: Object.getOwnPropertyNames(this.currentElement)[0] })
            });

    }

    const tick = (callback, rej) => {

        for (let i = this.currentElement + 1; i <= frame.length - 1; i++) {
            if (Object.getOwnPropertyNames(frame[i])[0] === 'timeOn') setState({ nextEx: frame[i].timeOn.exName });
            break;
        }

        this.timeEnd = Date.now() / 1000 + this.allTime;
        this.timeToEnd = Math.round(this.timeEnd - Date.now() / 1000)
        this.currentElement = frame[frame.length - this.timeToEnd]

        setState(
            {
                timeRemain: this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]].time,
                allTime: this.timeToEnd - 1,
                indicators: Object.assign({}, this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]], { status: Object.getOwnPropertyNames(this.currentElement)[0] }),

            });

        this.timerId = setInterval(() => {

            this.timeToEnd = Math.round(this.timeEnd - Date.now() / 1000)
            // console.log(this.timeToEnd)
            if (this.timeToEnd <= 0) {
                clearInterval(this.timerId)
                return
            }

            this.currentElement = frame[frame.length - this.timeToEnd]

            // setState({ timeRemain: this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]].time, allTime: this.timeToEnd - 1 });
            setState(
                {
                    timeRemain: this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]].time,
                    allTime: this.timeToEnd - 1,
                    indicators: Object.assign({}, this.currentElement[Object.getOwnPropertyNames(this.currentElement)[0]], { status: Object.getOwnPropertyNames(this.currentElement)[0] }),

                });

        }, 1000);
    }

}





// import { makeFrame, getAllTime } from './script/foos'

// export function Timer(obj, setState) {

//     const preset = Object.assign({}, obj);

//     this.timeRemain = preset.warmUp;

//     let frame = makeFrame(preset);
//     console.log(frame)

//     this.allTime = getAllTime(preset, frame);

//     this.currentElement = 0;

//     this.setAllTime = () => {
//         setState({ allTime: this.allTime });
//     }

//     this.start = () => {

//         setState({ status: 'start' });

//         this.timeEnd = Date.now() / 1000 + this.timeRemain;

//         const round = () => {

//             new Promise((res, rej) => tick(res, rej)).then(() => {
//                 this.currentElement++;
//                 this.timeRemain = preset[Object.getOwnPropertyNames(frame[this.currentElement])[0]];
//                 this.timeEnd = Date.now() / 1000 + preset[Object.getOwnPropertyNames(frame[this.currentElement])[0]];
//                 if (this.currentElement < frame.length) {
//                     round()
//                 }
//             })
//         }
//         if (this.allTime != 0) round();

//     }

//     this.stop = () => {
//         clearInterval(this.timerId);
//         setState({ status: 'pause' });
//     }

//     this.reset = () => {
//         this.stop();
//         this.timeRemain = preset.warmUp;
//         this.currentElement = 0;
//         setState({ config: obj });
//         setState({ timeRemain: obj.warmUp });
//         setState({ status: 'pause' });
//         this.allTime = getAllTime(preset, frame);
//         setState({ allTime: this.allTime });
//     }

//     const tick = (callback, rej) => {

//         setState({ timeRemain: this.timeRemain })

//         const ind = { indicators: frame[this.currentElement][Object.getOwnPropertyNames(frame[this.currentElement])] }
//         ind.indicators.status = Object.getOwnPropertyNames(frame[this.currentElement])[0];
//         setState(ind)

//         for (let i = this.currentElement + 1; i <= frame.length - 1; i++) {
//             if (Object.getOwnPropertyNames(frame[i])[0] === 'timeOn') setState({ nextEx: frame[i].timeOn.exName });
//             break;
//         }

//         this.timerId = setInterval(() => {
//             console.log(this.timeEnd - Date.now() / 1000);

//             this.timeRemain = Math.round(this.timeEnd - Date.now() / 1000)

//             // console.log('remain: ' + this.timeRemain + ' status: ' + frame[this.currentElement])
//             console.log(frame[this.currentElement])
//             console.log(this.timeRemain)
//             setState({ allTime: --this.allTime })
//             setState({ timeRemain: this.timeRemain });
//             if (this.currentElement === frame.length - 1 && this.timeRemain <= 0) {
//                 clearInterval(this.timerId);
//                 return;
//             }
//             if (this.timeRemain <= 0) {
//                 callback()
//                 clearInterval(this.timerId);
//                 return;
//             }
//         }, 1000);
//     }
// }