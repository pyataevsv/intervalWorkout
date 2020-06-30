import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { rootReducer } from './redux/reducer'
import './style/index.css';
import * as actions from './redux/actionCreators'
import * as serviceWorker from './serviceWorker';
import { MainPage } from './MainPage'
import { FramePage } from './FramePage'
import { ReviewPage } from './ReviewPage'
import { TimerPage } from './TimerPage'
import { defaultWorkouts } from './script/defaultworkouts'


export const store = createStore(rootReducer);
export const Context = React.createContext();

store.subscribe(() => {
  console.log('storeState:')
  console.log(store.getState());
});


// Code for further enters 
if (!localStorage.getItem('localWorkouts')) {
  defaultWorkouts.forEach(element => {
    store.dispatch(actions.addWorkout(element))
  });
  // localStorage.setItem('localWorkouts', JSON.stringify(defaultWorkouts));
} else {
  console.log('load from storage')
  JSON.parse(localStorage.getItem('localWorkouts')).forEach(element => {
    store.dispatch(actions.addWorkoutWithImg(element))
  });

}

// //Imitate first enter
// localStorage.removeItem('localWorkouts')
// defaultWorkouts.forEach(element => {
//   store.dispatch(actions.addWorkout(element))
// });
// localStorage.removeItem('localWorkouts')
// console.log(localStorage.getItem('localWorkouts'))


store.dispatch(actions.openMain())

class App extends React.Component {

  static contextType = Context;

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    this.value = this.context;

    switch (this.value.getState().screen.name) {
      case 'MAIN_PAGE':
        MainPage.contextType = Context;
        return (
          <MainPage />
        );
      case 'FRAME_PAGE':
        FramePage.contextType = Context;
        return (
          <FramePage />
        );
      case 'REVIEW_PAGE':
        ReviewPage.contextType = Context;
        return (
          <ReviewPage />
        );
      case 'TIMER_PAGE':
        TimerPage.contextType = Context;
        return (
          <TimerPage />
        );
      default:
        return (
          <MainPage />
        );
    }
  }
}



ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
