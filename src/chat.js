import { ApiAiClient } from "api-ai-javascript";
import { createStore, applyMiddleware } from "redux";

const accessToken = "cf9daf947c1a484f986615a44a5b5999";
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = "ON_MESSAGE";

export const sendMessage = (text, sender = "user") => ({
  type: ON_MESSAGE,
  payload: {
    text,
    sender,
  },
});

const messageMiddleware = () => (next) => (action) => {
  next(action);
  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;
    client.textRequest(text).then(onSuccess);
    function onSuccess(response) {
      const {
        result: { fulfillment },
      } = response;
      next(sendMessage(fulfillment.speech, "bot"));
    }
  }
};

const initState = [
  {
    text: "Hey",
    sender: "bot"
  },
];

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const store = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);
