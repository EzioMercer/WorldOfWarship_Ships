import {configureStore} from '@reduxjs/toolkit';
import api from './api';
import LoadingSlice from './Slices/LoadingSlice';
import ShipsSlice from './Slices/ShipsSlice';

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		loadingReducer: LoadingSlice,
		shipsReducer: ShipsSlice,
	},
	middleware: (gDM) => gDM().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
