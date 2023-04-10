import React, {useEffect, useRef, useState} from 'react';
import styles from './MultiSelect.module.scss';
import Checkbox from '../Checkbox/Checkbox';

export type Option = {
	id: string,
	value: string,
	icon?: string
}

const MultiSelect = ({
	label,
	defaultTitle,
	options,
	onChange
}: {
	label: string,
	defaultTitle: string,
	options: Option[],
	onChange: (s: string[]) => void
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState<string[]>([]);
	const selectBtnRef = useRef<HTMLDivElement>(null);
	const selectOptionsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (selectOptionsRef.current?.contains(target)) return;
			if (!selectBtnRef.current?.contains(target)) setIsOpen(false);
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [selectBtnRef, selectOptionsRef]);

	const toggleOption = (id: string, needAdd: boolean) => {
		const valuesSet = new Set(value);

		valuesSet[needAdd ? 'add' : 'delete'](id);

		const arr = [...valuesSet];

		setValue(arr);
		onChange(arr);
	}

	return (
		<div className={'label ' + styles.multiselect}>
			{label}
			<div className={styles.wrapper + ' ' + (isOpen ? styles.open : '')}>
				<div
					className={styles.selected}
					onClick={() => setIsOpen(!isOpen)}
					ref={selectBtnRef}
				>
					<div
						className={styles.truncated}
						data-value={
							value.length === 0 ?
								defaultTitle :
								value.map(id => options.find(option => option.id === id)?.value).join(', ')
						}
					></div>
				</div>
				<div className={styles.options} ref={selectOptionsRef}>
					{
						options.map(
							option =>
								<Checkbox
									key={option.id}
									label={option.value}
									icon={option.icon}
									onToggle={(needAdd: boolean) => toggleOption(option.id, needAdd)}
								/>
						)
					}
				</div>
			</div>
			<select multiple={true} defaultValue={value}>
				{options.map(option => <option key={option.id} value={option.id}>{option.value}</option>)}
			</select>
		</div>
	)
}

export default MultiSelect;
