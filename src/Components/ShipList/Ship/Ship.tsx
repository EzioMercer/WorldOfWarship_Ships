import React, {useState} from 'react';
import styles from './Ship.module.scss';
import ShipProps from '../../../Helpers/Types/ShipProps';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import {useGetMediaPathQuery, useGetNationsQuery, useGetVehicleTypesCommonQuery} from '../../../Redux/api';

const formatName = (name: string) => name
	.replace(/\(.*\)/g, '');

const Ship = ({
	shipData
}:{
	shipData: ShipProps
}) => {
	const {data: mediaPath, isLoading: isMediaPathLoading} = useGetMediaPathQuery();
	const {data: nations, isLoading: isNationsLoading} = useGetNationsQuery();
	const {data: types, isLoading: isTypesLoading} = useGetVehicleTypesCommonQuery();
	const [isImgLoaded, setIsImgLoaded] = useState(false);

	const shipNation = nations?.find(nation=>nation.name === shipData.nation);
	const shipType = Object.entries(types ?? {}).find(type=>type[0] === shipData.tags[0])?.[1];

	return (
		<div className={styles.ship}>
			<div className={styles.name}>{formatName(shipData.localization.mark.en)}</div>
			{
				isMediaPathLoading ? <LoadingSpinner /> :
					<>
						{!isImgLoaded && <LoadingSpinner />}
						<img
							src={mediaPath + shipData.icons.medium}
							alt={shipData.name}
							onLoad={() => setIsImgLoaded(true)}
						/>
					</>
			}
			<div className={styles.info}>
				{
					(isTypesLoading || isNationsLoading) ? <LoadingSpinner /> :
						<>
							<span>Detailed info</span>
							<div className={styles.description}><b>Description:</b> {shipData.localization.description.en}</div>
							<div><b>Nationality:</b> {shipNation?.localization.mark.en}</div>
							<div><b>Type:</b> {shipType?.localization.mark.en}</div>
						</>
				}
			</div>
		</div>
	)
}

export default Ship;
