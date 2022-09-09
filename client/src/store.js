import { configureStore } from '@reduxjs/toolkit';
import { clubListReducer } from './reducers/clubReducers';

const reducer = {
  clubList: clubListReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production', //only show devTools when in production
});

export default store;
