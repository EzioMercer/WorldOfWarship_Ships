import React, {useState} from 'react';
import styles from './Checkbox.module.scss';
import {useGetMediaPathQuery} from '../../Redux/api';

const Checkbox = ({
	label,
	onToggle,
	icon
}: {
	label: string,
	onToggle: (b: boolean) => void,
	icon?: string
}) => {
	const {data: mediaPath, isLoading: isMediaPathLoading} = useGetMediaPathQuery();
	const [isChecked, setIsChecked] = useState(false);

	return (
		<label className={styles.container}>
			{
				!isMediaPathLoading && icon && <img src={mediaPath + icon} alt="icon"/>
			}
			{label}
			<input
				type="checkbox"
				checked={isChecked}
				onChange={() => {
					setIsChecked(!isChecked);
					onToggle(!isChecked);
				}}
			/>
			<span className={styles.checkmark}></span>
		</label>
	)
}

export default Checkbox;
