import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";

import ITruckController from "./IControllers/ITruckController";
import ITruckDTO from '../dto/ITruckDTO';
import ITruckService from "../services/IServices/ITruckService";

@Service()
export default class TruckController implements ITruckController {
	constructor(@Inject(config.services.truck.name) private truckServiceInstance: ITruckService) {
	}

	public async createTruck(req: Request, res: Response, next: NextFunction) {

		try {
			const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<{ truckDTO: ITruckDTO, token: string }>;


			if (truckOrError.isFailure) {
				return res.status(400).json(truckOrError.error);
			}

			const truckDTO = truckOrError.getValue();
			return res.status(201).json(truckDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async findTruckById(req: Request, res: Response, next: NextFunction) {
		try {
			const lsParameter = req.query.ls as string;

			if (lsParameter === undefined) {
				return res.status(404).json("Please insert a License Plate in the parameters.");
			}

			const truckOrError = await this.truckServiceInstance.getTruckById(lsParameter);

			if (truckOrError.isFailure) {
				return res.status(404).json(truckOrError.error);
			}

			const truckDTO = truckOrError.getValue();
			return res.status(200).json(truckDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async findAllTrucks(req: Request, res: Response, next: NextFunction) {
		try {
			const truckOrError = await this.truckServiceInstance.getAllTrucks() as Result<ITruckDTO[]>;

			if (truckOrError.isFailure) {
				return res.status(404).json(truckOrError.error);
			}

			const truckDTO = truckOrError.getValue();
			return res.status(200).json(truckDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async updateTruck(req: Request, res: Response, next: NextFunction) {
		try {
			const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<{ truckDTO: ITruckDTO, token: string }>;

			if (truckOrError.isFailure) {
				return res.status(404).json(truckOrError.error);
			}

			const truckDTO = truckOrError.getValue();
			return res.status(200).json(truckDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteTruckById(req: Request, res: Response, next: NextFunction) {
		try {
			const lsParameter = req.query.ls as string;

			if (lsParameter === undefined) {
				return res.status(400).json("Please insert a License Plate in the parameters.");
			}

			const truckOrError = await this.truckServiceInstance.deleteTruckById(lsParameter);

			if (truckOrError.isFailure) {
				return res.status(404).json(truckOrError.error);
			}

			const truckDTO = truckOrError.getValue();
			return res.status(200).json(truckDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async changeStatus(req: Request, res: Response, next: NextFunction){
		try {
			const novo = await this.truckServiceInstance.changeStatus(req.body as string) as Result<{ truckDTO: ITruckDTO, token: string }>;

			if (novo.isFailure) {
				return res.status(400).send();
			}

			const truckPosts = novo.getValue();
			res.status(200);
			return  res.json(truckPosts);
		} catch(e) {
			return next(e);
		}
	}

	public async softDelete(req: Request, res: Response, next: NextFunction){

		try {
			const licensePlateParameter=req.query.licensePlate as string;

			if (!licensePlateParameter){
				return res.status(400).json("Is required a license plate.");
			}
			const novo = await this.truckServiceInstance.softDelete(licensePlateParameter) as Result<{ truckDTO: ITruckDTO, token: string }>;

			if (novo.isFailure) {
				return res.status(400).send();
			}

			const truckPosts = novo.getValue();
			res.status(200);
			return  res.json(truckPosts);
		} catch(e) {
			return next(e);
		}


	}

}
