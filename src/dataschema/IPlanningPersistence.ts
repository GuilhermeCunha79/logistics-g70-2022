export interface IPlanningPersistence {
	_id: string;
	planningId: string;
	licensePlate: string;
	date: number;
	warehouse: string[];
	delivery: string[][];
}
