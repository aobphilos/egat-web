import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import plantReducer from '../features/plant/plantSlice';
import layoutReducer from '../features/layout/layoutSlice';
import forecastReducer from '../features/forecast/forecastSlice';

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, plant: plantReducer, layout: layoutReducer, forecast: forecastReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
