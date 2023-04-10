import Translates from './Translates';

export type ShipProps = {
	level: number,
	name: string,
	icons: {
		local_contour: string,
		contour_alive: string,
		medium: string,
		default: string,
		local_small: string,
		contour_dead: string,
		large: string,
		local_contour_dead: string,
		local_contour_alive: string,
		small: string,
		contour: string
	}
	tags: string[],
	localization: {
		shortmark: Translates,
		description: Translates,
		mark: Translates
	},
	nation: string
}

export default ShipProps;
