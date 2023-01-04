import {Result} from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";
import {NextFunction, Request, Response} from "express";

export default interface ITruckService {
	createTruck(truckDTO: ITruckDTO): Promise<Result<{ truckDTO: ITruckDTO, token: string }>>;

	updateTruck(truckDTO: ITruckDTO): Promise<Result<{ truckDTO: ITruckDTO, token: string }>>;

	getTruckById(licensePlate: string): Promise<Result<ITruckDTO>>;

	getAllTrucks(): Promise<Result<ITruckDTO[]>>;

	deleteTruckById(licensePlate: string): Promise<Result<{ truckDTO: ITruckDTO, token: string }>>;


	changeStatus(licensePlate: string): Promise<Result<{ truckDTO: ITruckDTO, token: string }>>;

	softDelete(licensePlate: string): Promise<Result<{ truckDTO: ITruckDTO, token: string }>>;



}
