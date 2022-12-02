export default interface IRouteDTO {
	routeId: string;
	origin: string;
	destination: string;
	distance: number;
	timeDistance: number;
	energySpent: number;
	extraBatteryTime: number;
}
