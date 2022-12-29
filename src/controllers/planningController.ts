import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";

import IPlanningService from "../services/IServices/IPlanningService";
import IPlanningController from "./IControllers/IPlanningController";
import IPlanningDTO from "../dto/IPlanningDTO";

@Service()
export default class PlanningController implements IPlanningController {
	constructor(@Inject(config.services.planning.name) private planningServiceInstance: IPlanningService) {
	}

	public async createPlanning(req: Request, res: Response, next: NextFunction) {
		try {
			const planningOrError = await this.planningServiceInstance.createPlanning(req.body as IPlanningDTO, req.body.heuristic) as Result<{ planningDTO: IPlanningDTO, token: string }>;

			if (planningOrError.isFailure) {
				return res.status(400).json(planningOrError.error);
			}

			const planningDTO = planningOrError.getValue();
			return res.status(201).json(planningDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async findPlanning(req: Request, res: Response, next: NextFunction) {
		try {
			const licensePlateParameter = req.query.licensePlate as string;
			const dateParameter = req.query.date as string;

			let planningOrError;

			if (!licensePlateParameter && !dateParameter) {
				planningOrError = await this.planningServiceInstance.getPlanning() as Result<IPlanningDTO[]>;
			}

			if (licensePlateParameter) {
				planningOrError = await this.planningServiceInstance.getPlanning({licensePlate: licensePlateParameter});
			} else if (dateParameter) {
				planningOrError = await this.planningServiceInstance.getPlanning({date: dateParameter});
			}

			if (planningOrError.isFailure) {
				return res.status(404).json(planningOrError.error);
			}

			const planningDTO = planningOrError.getValue();
			return res.status(200).json(planningDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async updatePlanning(req: Request, res: Response, next: NextFunction) {
	}

	public async deletePlanning(req: Request, res: Response, next: NextFunction) {
	}
}
