import Translates from './Translates';

type NationProps = {
	name: string,
	icons: {
		large: string,
		default: string,
		local_large: string,
		local_tiny: string,
		small: string,
		local_small: string,
		tiny: string
	},
	color: number,
	tags: string[],
	localization: {
		mark: Translates
	},
	id: number
}

export default NationProps;
