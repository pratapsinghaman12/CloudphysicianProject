import {configureStore} from '@reduxjs/toolkit';
import textReducer from './src/redux/textSlice';

export const store = configureStore({
  reducer: {
    textEditor: textReducer,
  },
});