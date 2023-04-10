import React from 'react';
import styles from './Input.module.scss';

export type InputProps = {
	label: string,
	onChange: (s: string) => void
}

const Input = (props:InputProps) => {
	return (
		<label className={styles.input}>
			{props.label}
			<input
				onChange={e => props.onChange(e.target.value)}
			/>
		</label>
	)
}

export default Input;
