import React from "react";
import ReactDOM from "react-dom";
import "milligram";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, sendMessage } from "./chat";

const App = () => {
  const { feed } = useSelector((state) => ({ feed: state }));
  const dispatch = useDispatch();
  return (
    <div>
      <h1>🤖 Chat bot with attitude!</h1>
      <ul>
        {feed.map((entry) => (
          <li key={entry.text}>{entry.text}</li>
        ))}
      </ul>
      <input
        type="text"
        onKeyDown={(e) =>
          e.keyCode === 13 ? dispatch(sendMessage(e.target.value)) : ""
        }
      />
    </div>
  );
};

export default App;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
