import React from 'react';
import styles from './ShipList.module.scss';
import ShipProps from '../../Helpers/Types/ShipProps';
import Ship from './Ship/Ship';

const ShipList = ({
	ships
}:{
	ships: [string, ShipProps][]
}) => {

	return (
		<ul className={styles.ul}>
			{
				ships.map(([id, shipData]) => <Ship key={id} shipData={shipData}/>)
			}
		</ul>
	)
}

export default ShipList;
