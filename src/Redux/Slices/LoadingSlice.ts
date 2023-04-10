import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: false,
	reducers: {
		changeLoadingState: (_, action: PayloadAction<boolean>) => action.payload,
	}
})

export const {changeLoadingState} = loadingSlice.actions;
export default loadingSlice.reducer;
