import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import ShipList from './Components/ShipList/ShipList';
import {useGetShipsQuery} from './Redux/api';
import Filters from './Components/Filters/Filters';
import useTypedDispatch from './Helpers/Hooks/useTypedDispatch';
import {setShips} from './Redux/Slices/ShipsSlice';
import useTypedSelector from './Helpers/Hooks/useTypedSelector';

const App = () => {
    const loadMoreCount = 50;
    const dispatch = useTypedDispatch();

    const [showTill, setShowTill] = useState(loadMoreCount);
    const {data, isLoading} = useGetShipsQuery();

    useEffect(() => {
        dispatch(setShips(Object.entries(data ?? {})));
    }, [isLoading])

    const ships = useTypedSelector(state => state).shipsReducer.filteredShips;
    const truncatedShips = ships.slice(0, showTill);
    const showLoadMore = truncatedShips.length !== ships.length;

    return(
        <div className={styles.app}>
            {isLoading && <LoadingSpinner />}
            <Filters />
            <ShipList ships={truncatedShips} />
            {
                showLoadMore &&
                <button
                    onClick={() => setShowTill(showTill + loadMoreCount)}
                >
                    Load more
                </button>
            }
        </div>
    )
}

export default App;
