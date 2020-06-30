import React from 'react';
import * as actions from './redux/actionCreators';
import './style/main-page.css';
import './style/frame.css';

export class MainPage extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {

    const header = document.querySelector('header');
    const root = document.querySelector('.main-feed');
    const last = document.querySelector('.last-wkt');
    const footer = document.querySelector('.btn-footer');
    // const footer = document.querySelector('.btn-footer');
    // root.style.height = (Number(window.getComputedStyle(root).height.replace('px', '')) + Number(window.getComputedStyle(footer).height.replace('px', ''))) + 'px';
    last.style.paddingTop = window.getComputedStyle(header).height;
    root.style.paddingBottom = window.getComputedStyle(footer).height;
    // window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }

  render() {
    const store = this.context;
    return (
      <div>
        <div className="App gradient-top">
          <header className="home-header">
            <div className='page-name'>
              <span>HOME</span>
            </div>
          </header>
          <LastWorkout store={store} />

          <MainFeed store={store} />
        </div>
        <footer className='btn-footer'>
          <div className='btn' onClick={() => store.dispatch(actions.openFrame())}>Add new</div>
        </footer>
      </div>
    )
  }
}

function LastWorkout(props) {
  const store = props.store;
  const totalSets = store.getState().workouts[0].sets * store.getState().workouts[0].rounds * store.getState().workouts[0].exs.length;
  return (<div className='last-wkt'>
    <h2>Last workout</h2>
    <div className='last-card'>
      <div className='last-card-inner'>
        <div className='last-card-name'>{store.getState().workouts[0].name}</div>
        <div className='last-card-meta'>
          <div>
            <i className="material-icons">access_time</i>&nbsp;
            {Math.round(store.getState().workouts[0].allTime / 60)} min
          </div>
          <div>
            <i className="material-icons">fitness_center</i>&nbsp;
            {store.getState().workouts[0].exs.length} ex
          </div>
          <div>
            <i className="material-icons">replay</i>&nbsp;
            {totalSets} sets
          </div>
        </div>
      </div>
    </div>
  </div>
  )

}


function MainFeed(props) {
  const store = props.store;
  let categories = Array.from(new Set(store.getState().workouts.map(item => item.category)));
  const totalSets = store.getState().workouts[0].sets * store.getState().workouts[0].rounds * store.getState().workouts[0].exs.length;

  return (
    <div className='main-feed'>
      <div className='sections'>
        <span>Sections</span>
      </div>
      {categories.map(item => {
        return (
          <div key={item}>
            <div className='cat-name'>
              <h2>{item}</h2>
            </div>
            <div className='wkt-card-box'>

              {props.store.getState().workouts.filter(x => x.category === item).map((item, ind) => {

                const styleImg = {
                  backgroundImage: 'url(' + require(`./img/backgrounds/${item.imgId}.jpeg`) + ')',
                }

                return (<div className='wkt-card' style={styleImg} key={item.id} onClick={() => props.store.dispatch(actions.openReview(item.id))}>
                  <div className='wkt-card-inner'>
                    <div className='wkt-card-meta'>
                      <span>
                        <i className="material-icons">access_time</i>
                        &nbsp;
                        {Math.round(item.allTime / 60)} min
                      </span>
                    </div>
                    <div>
                      <div className='wkt-card-name'>{item.name}</div>
                      <div className='wkt-card-meta-bot'>
                        <span>
                          <i className="material-icons">fitness_center</i>&nbsp;
                          {store.getState().workouts[0].exs.length} ex
                        </span>
                        <span>
                          <i className="material-icons">replay</i>&nbsp;
                        {totalSets} sets
                      </span>
                      </div>
                    </div>
                  </div>
                </div>)
              }
              )}

            </div>
          </div>
        )
      })}
    </div>
  )
}

