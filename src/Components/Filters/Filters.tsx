import React, {createContext, useState} from 'react';
import styles from './Filters.module.scss';
import Nullable from '../../Helpers/Types/Nullable';
import FilterByName from './FilterByName/FilterByName';
import FilterByNations from './FilterByNations/FilterByNations';
import FilterByTypes from './FilterByTypes/FilterByTypes';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export const FiltersReadyContext = createContext<Nullable<(status: boolean) => void>>(null);

const Filters = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [isFiltersReady, setIsFiltersReady] = useState<boolean[]>([]);

	const UpdateFiltersReadyStatus = (isLoading: boolean) => {
		setIsFiltersReady(prevState => {
			const newState = [...prevState];

			if (!isLoading) newState.pop();
			else newState.push(isLoading);

			return newState;
		})
	}

	return (
		<div className={styles.filters}>
			{(isFiltersReady.length !== 0) && <LoadingSpinner />}
			<div className={styles.header} onClick={() => setShowFilters(!showFilters)}>
				<div className={styles.icon}></div>
				<div className={styles.title}>Filters</div>
			</div>
			<div className={styles.body + ' ' + (showFilters ? styles.open : ' ')}>
				<FilterByName />
				<FiltersReadyContext.Provider value={UpdateFiltersReadyStatus}>
					<FilterByNations />
					<FilterByTypes />
				</FiltersReadyContext.Provider>
			</div>
		</div>
	)
}

export default Filters;
