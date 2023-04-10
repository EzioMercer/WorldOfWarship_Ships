import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ShipProps from '../Helpers/Types/ShipProps';
import NationProps from '../Helpers/Types/NationProps';
import ShipTypes from '../Helpers/Types/ShipTypes';
import ShipTypeCommonProps from '../Helpers/Types/ShipTypeCommonProps';

type Response<T> = {
	status: string,
	data: T
}

const api = createApi({
	baseQuery: fetchBaseQuery({baseUrl: 'https://vortex.worldofwarships.eu/api/encyclopedia/en/'}),
	endpoints: (builder) => ({
		getShips: builder.query<{[K: number]: ShipProps}, void>({
			query: () => 'vehicles/',
			transformResponse: (response: Response<{[K: number]: ShipProps}>) => response.data
		}),
		getNations: builder.query<NationProps[], void>({
			query: () => 'nations/',
			transformResponse: (response: Response<NationProps[]>) => response.data
		}),
		getVehicleTypesCommon: builder.query<{[key in ShipTypes]: ShipTypeCommonProps}, void>({
			query: () => 'vehicle_types_common/',
			transformResponse: (response: Response<{[key in ShipTypes]: ShipTypeCommonProps}>) => response.data
		}),
		getMediaPath: builder.query<string, void>({
			query: () => 'media_path/',
			transformResponse: (response: Response<string>) => response.data
		})
	}),
});

export default api;

export const {
	useGetShipsQuery,
	useGetNationsQuery,
	useGetVehicleTypesCommonQuery,
	useGetMediaPathQuery,
} = api;
