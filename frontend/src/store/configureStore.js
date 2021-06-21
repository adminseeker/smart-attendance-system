import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import alertReducer from '../reducers/alert';
import roomsReducer from '../reducers/rooms';
import classesReducer from '../reducers/classes';
import usersReducer from '../reducers/users';
import journeysReducer from '../reducers/journey';
import passengersReducer from '../reducers/passengers';
import locationReducer from '../reducers/tracking';
import timingsReducer from '../reducers/timings';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      alert: alertReducer,
      rooms: roomsReducer,
      classes: classesReducer,
      users: usersReducer,
      journeys: journeysReducer,
      passengers: passengersReducer,
      location: locationReducer,
      timings: timingsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

export default configureStore;
