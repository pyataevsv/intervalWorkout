import React from 'react';
import { toMmSs, makeExFrame } from '../script/foos'
import '../components/curnextex.css'

export class CurrentNextEx extends React.Component {

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        const curElement = document.getElementById(`${this.props.currentElementId}`)
        curElement.classList.add('nextex-current')
        curElement.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        console.log(this.props.frame)
        const getNextName = (item) => {
            // return (item.status == 'timeOn') ? item.exName : 'Rest'
            switch (item.status) {
                case 'timeOn':
                    return item.exName;
                case 'warmUp':
                    return 'Warm up'
                case 'roundRestTime':
                    return 'Round rest'
                case 'finish':
                    return 'FINISH'
                default:
                    return 'Rest'
            }
        }

        const divs = this.props.frame.concat([{ exName: "finish", status: "finish" }]).map((item, id) => {
            return (
                <div className={(id === this.props.currentElementId) ? 'nextex-current nextex-item' : 'nextex-item'} key={id.toString()} id={id}>
                    <div>
                        {getNextName(item)}
                    </div>
                    <div>{(item.time) ? toMmSs(item.time + 1) : null}</div>
                </div>
            )
        })

        return (
            <div >
                {divs}
            </div>
        )
    }
}