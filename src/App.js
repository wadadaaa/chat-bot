import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'milligram';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {store, sendMessage} from './chat';
import typing from './assets/group_chat.svg';

const App = () => {
  const {feed} = useSelector (state => ({feed: state}));
  const dispatch = useDispatch ();

  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>Chat bot with attitude!</h2>
          <dl>
            {feed.map (entry => (
              <dt key={entry.text}><b>{entry.sender}</b> : {entry.text}</dt>
            ))}
          </dl>
          <input
            type="text"
            onKeyDown={e =>
              e.keyCode === 13 ?
               dispatch (sendMessage (e.target.value)) : ''}
          />
        </div>
      </div>
      <div className="img">
        <img src={typing} alt="bot" />
      </div>
    </div>
  );
};

export default App;

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('root')
);
