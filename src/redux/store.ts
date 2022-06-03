import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userInfoReducer } from './userInfos/slice';

const rootReducer = combineReducers({
  user: userInfoReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware()],
  devTools: true,
});

export default store;
