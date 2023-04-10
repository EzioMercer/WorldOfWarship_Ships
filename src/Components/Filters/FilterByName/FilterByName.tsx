import React from 'react';
import {filterShips} from '../../../Redux/Slices/ShipsSlice';
import Input from '../../Input/Input';
import useTypedDispatch from '../../../Helpers/Hooks/useTypedDispatch';

const FilterByName = () => {
	const dispatch = useTypedDispatch();

	return <Input
		label="Name"
		onChange={(name: string) => dispatch(filterShips({name}))}
	/>
}

export default FilterByName;
