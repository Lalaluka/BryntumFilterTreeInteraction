import { configureStore } from '@reduxjs/toolkit';
import { setAutoFreeze } from 'immer';
import schedulerReducer from './schedulerSlice';

// Bryntum mutates data in-place (e.g. sort), so we disable Immer's
// object freezing to avoid read-only property errors.
setAutoFreeze(false);

export const store = configureStore({
    reducer: {
        scheduler: schedulerReducer,
    },
});
