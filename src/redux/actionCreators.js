import * as actionTypes from './actionTypes'

export function openFrame(id = null) {
    return {
        type: actionTypes.OPEN_SCREEN,
        name: 'FRAME_PAGE',
        id
    }
}

export function openMain() {
    return {
        type: actionTypes.OPEN_SCREEN,
        name: 'MAIN_PAGE'
    }
}

export function openReview(id = null) {
    return {
        type: actionTypes.OPEN_SCREEN,
        name: 'REVIEW_PAGE',
        id
    }
}

export function openTimer(id = null) {
    return {
        type: actionTypes.OPEN_SCREEN,
        name: 'TIMER_PAGE',
        id
    }
}


export function addWorkout(workout) {
    return {
        type: actionTypes.ADD_WORKOUT,
        workout
    }

}
export function addWorkoutWithImg(workout) {
    return {
        type: actionTypes.ADD_WORKOUT_WITH_IMG,
        workout
    }

}

export function editWorkout(workout, id) {
    return {
        type: actionTypes.EDIT_WORKOUT,
        id,
        workout
    }
}

export function removeWorkout(id) {
    return {
        type: actionTypes.REMOVE_WORKOUT,
        id,
    }
}

