import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { getAllTime } from '../script/foos'

const refreshLocalStorage = (newState) => {
    localStorage.setItem('localWorkouts', JSON.stringify(newState));
}

let id = -1;

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const rootReducer = combineReducers({
    screen,
    workouts,

})

function screen(state = 'MAIN', action = '') {
    if (action.type === actionTypes.OPEN_SCREEN) {
        return Object.assign({}, { name: action.name, id: action.id });
    }
    return state
}

function workouts(state = [], action) {
    if (action.type === actionTypes.ADD_WORKOUT) {
        let newState
        newState = state.concat([Object.assign({}, action.workout, { id: ++id }, { imgId: getRandomInt(11) }, { allTime: getAllTime(action.workout) })])
        console.log(newState)
        refreshLocalStorage(newState)
        console.log(localStorage.getItem('localWorkouts'))
        return newState
    }
    if (action.type === actionTypes.ADD_WORKOUT_WITH_IMG) {
        let newState
        newState = state.concat([Object.assign({}, action.workout, { id: ++id }, { allTime: getAllTime(action.workout) })])
        return newState
    }

    if (action.type === actionTypes.EDIT_WORKOUT) {
        let newState = state.concat([]);
        let ind;
        state.forEach((item) => { if (item.id === action.id) ind = action.id });
        newState[ind] = Object.assign({}, action.workout, { allTime: getAllTime(action.workout) });
        refreshLocalStorage(newState)
        return newState
    }
    if (action.type === actionTypes.REMOVE_WORKOUT) {
        let ind;
        state.forEach((item) => { if (item.id === action.id) ind = action.id });
        let arr = Object.assign([], state);
        arr.splice(ind, 1)
        refreshLocalStorage(arr)
        return arr
    }
    return state
}

