import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ShipProps from '../../Helpers/Types/ShipProps';

type Ship = [string, ShipProps];

type ShipFilters = {
	name: string,
	nations: string[],
	types: string[],
}

const initialState: {
	ships: Ship[],
	filteredShips: Ship[],
	filters: ShipFilters
} = {
	ships: [],
	filteredShips: [],
	filters: {
		name: '',
		nations: [],
		types: [],
	},
};

const shipsSlice = createSlice({
	name: 'ships',
	initialState: initialState,
	reducers: {
		setShips: (state, action: PayloadAction<Ship[]>) => {
			state.ships = [...action.payload];
			state.filteredShips = [...action.payload];
		},
		filterShips: (state, action: PayloadAction<Partial<ShipFilters>>) => {
			let ships = state.ships;

			state.filters.name = action.payload.name?.trim() ?? state.filters.name;
			const name = state.filters.name

			if (name !== '') {
				const nameFormatted = name
					.replace(/a/ig, '[aá]')
					.replace(/o/ig, '[oöō]')
					.replace(/u/ig, '[uüū]')
					.replace(/e/ig, '[eè]');

				const nameRegExp = new RegExp(nameFormatted, 'i');

				ships = ships.filter(ship => ship[1].localization.mark.en.search(nameRegExp) !== -1)
			}

			state.filters.nations = action.payload.nations ?? state.filters.nations;
			const nations = state.filters.nations;

			if (nations.length !== 0) {
				const nationsSet = new Set(nations);

				ships = ships.filter(ship => nationsSet.has(ship[1].nation))
			}

			state.filters.types = action.payload.types ?? state.filters.types;
			const types = state.filters.types;

			if (types.length !== 0) {
				const typesSet = new Set(types);

				ships = ships.filter(ship => typesSet.has(ship[1].tags[0] ?? ''))
			}

			state.filteredShips = ships;
		},
	},
});

export const {
	setShips,
	filterShips,
} = shipsSlice.actions;
export default shipsSlice.reducer;
