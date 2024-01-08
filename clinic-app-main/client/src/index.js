import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import medicineReducer from './Admin/Redux/Reducer/medicineReducer';
import patientReducer from './Admin/Redux/Reducer/patientReducer';
import treatmentReducer from './Admin/Redux/Reducer/treatmentReducer';
import generalReducer from './Admin/Redux/Reducer/generalReducer';
import userReducer from './User/Redux/Reducer/userReducer';

const rootReducer = combineReducers({
  medicine: medicineReducer,
  patientStore: patientReducer,
  treatmentStore: treatmentReducer,
  allDetailStore: generalReducer,
  userStore: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
