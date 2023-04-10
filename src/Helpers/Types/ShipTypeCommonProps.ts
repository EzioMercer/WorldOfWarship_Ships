import Translates from './Translates';

type ShipTypeCommonProps = {
	icons: {
		default: string,
		elite: string,
		premium: string,
		special: string,
		normal: string
	},
	sort_order: number,
	localization: {
		shortmark: Translates,
		mark: Translates
	},
	name: string
}

export default ShipTypeCommonProps;
