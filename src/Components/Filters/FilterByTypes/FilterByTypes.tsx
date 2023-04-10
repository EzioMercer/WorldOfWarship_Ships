import React, {useContext, useEffect, useState} from 'react';
import MultiSelect, {Option} from '../../MultiSelect/MultiSelect';
import {useGetVehicleTypesCommonQuery} from '../../../Redux/api';
import {filterShips} from '../../../Redux/Slices/ShipsSlice';
import useTypedDispatch from '../../../Helpers/Hooks/useTypedDispatch';
import {FiltersReadyContext} from '../Filters';

const FilterByTypes = () => {
	const dispatch = useTypedDispatch();
	const filtersReadyContext = useContext(FiltersReadyContext);
	const [types, setVehicleTypesCommons] = useState<Option[]>([]);
	const {data, isLoading} = useGetVehicleTypesCommonQuery();

	useEffect(() => {
		filtersReadyContext?.(isLoading);

		setVehicleTypesCommons(Object.entries(data ?? {}).map(vehicleTypeCommonsData=>({
			id: vehicleTypeCommonsData[0],
			value: vehicleTypeCommonsData[1].localization.mark.en,
			icon: vehicleTypeCommonsData[1].icons.default
		})));

		return () => {
			filtersReadyContext?.(false);
		}
	}, [isLoading]);

	return <MultiSelect
		label="Types"
		defaultTitle="Select types"
		options={types}
		onChange={(types: string[]) => dispatch(filterShips({types}))}
	/>
}

export default FilterByTypes;
