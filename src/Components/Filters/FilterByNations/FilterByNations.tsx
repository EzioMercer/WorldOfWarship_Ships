import React, {useContext, useEffect, useState} from 'react';
import MultiSelect, {Option} from '../../MultiSelect/MultiSelect';
import {useGetNationsQuery} from '../../../Redux/api';
import {filterShips} from '../../../Redux/Slices/ShipsSlice';
import useTypedDispatch from '../../../Helpers/Hooks/useTypedDispatch';
import {FiltersReadyContext} from '../Filters';

const FilterByNations = () => {
	const dispatch = useTypedDispatch();
	const filtersReadyContext = useContext(FiltersReadyContext);
	const [nations, setNations] = useState<Option[]>([]);
	const {data, isLoading} = useGetNationsQuery();

	useEffect(() => {
		filtersReadyContext?.(isLoading);

		setNations(Object.entries(data ?? []).map(nation=>({
			id: nation[1].name,
			value: nation[1].localization.mark.en,
			icon: nation[1].icons.tiny
		})));

		return () => {
			filtersReadyContext?.(false);
		}
	}, [isLoading]);

	return <MultiSelect
		label="Nations"
		defaultTitle="Select nations"
		options={nations}
		onChange={(nations: string[]) => dispatch(filterShips({nations}))}
	/>
}

export default FilterByNations;
