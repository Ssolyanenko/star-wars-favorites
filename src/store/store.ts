import { configureStore } from '@reduxjs/toolkit';
import populationReducers from "./slices/populationSlice";

const store = configureStore({
  reducer: {
    characters: populationReducers,
  },
});

export default store;