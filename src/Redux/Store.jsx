import { configureStore } from "@reduxjs/toolkit";

import dataReducer from './DataSlice'

export const Store = configureStore({
    reducer:{
        data:dataReducer,
    }
});