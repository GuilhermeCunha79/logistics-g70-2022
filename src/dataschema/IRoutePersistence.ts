export interface IRoutePersistence {
	_id: string;
	routeId: string;
	origin: string;
	destination: string;
	distance: number;
	timeDistance: number;
	energySpent: number;
	extraBatteryTime: number;
}
