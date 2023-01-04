export interface ITruckPersistence {
	_id: string;
	licensePlate: string;
	autonomy: number;
	capacityCargo: number;
	capacityTransportation: number;
	battery: number;
	tare: number;
	status: boolean;
}
