import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";

import IRouteController from "./IControllers/IRouteController";
import IRouteDTO from "../dto/IRouteDTO";
import IRouteService from "../services/IServices/IRouteService";

@Service()
export default class RouteController implements IRouteController {
	constructor(@Inject(config.services.route.name) private routeServiceInstance: IRouteService) {
	}

	public async createRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const routeOrError = await this.routeServiceInstance.createRoute(req.body as IRouteDTO) as Result<{ routeDTO: IRouteDTO, token: string }>;

			if (routeOrError.isFailure) {
				return res.status(400).json(routeOrError.error);
			}

			const routeDTO = routeOrError.getValue();
			return res.status(201).json(routeDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async findRoutes(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.routeId as string;
			const originParameter = req.query.origin as string;
			const destinationParameter = req.query.destination as string;
			const distanceParameter = req.query.distance as string;
			const timeDistanceParameter = req.query.timeDistance as string;
			const energySpentParameter = req.query.energySpent as string;
			const extraBatteryTimeParameter = req.query.extraBatteryTime as string;

			let routeOrError;

			if (!idParameter && !originParameter && !destinationParameter && !distanceParameter &&
				!timeDistanceParameter && !energySpentParameter && !extraBatteryTimeParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes() as Result<IRouteDTO[]>;
			}

			if (idParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes({routeId: idParameter});
			} else if (originParameter) {
				if (destinationParameter) {
					routeOrError = await this.routeServiceInstance.getRoutes({
						origin: originParameter,
						destination: destinationParameter
					});
				}
				routeOrError = await this.routeServiceInstance.getRoutes({origin: originParameter});
			} else if (destinationParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes({destination: destinationParameter});
			} else if (distanceParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes({distance: distanceParameter});
			} else if (timeDistanceParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes({timeDistance: timeDistanceParameter});
			} else if (energySpentParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes({energySpent: energySpentParameter});
			} else if (extraBatteryTimeParameter) {
				routeOrError = await this.routeServiceInstance.getRoutes({extraBatteryTime: extraBatteryTimeParameter});
			}

			if (routeOrError.isFailure) {
				return res.status(404).json(routeOrError.error);
			}

			const routeDTO = routeOrError.getValue();
			return res.status(200).json(routeDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async updateRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const routeOrError = await this.routeServiceInstance.updateRoute(req.body as IRouteDTO) as Result<{ routeDTO: IRouteDTO, token: string }>;

			if (routeOrError.isFailure) {
				return res.status(404).json(routeOrError.error);
			}

			const routeDTO = routeOrError.getValue();
			return res.status(200).json(routeDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteRouteById(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.routeId as string;

			if (idParameter === undefined) {
				return res.status(400).json("Please insert an ID in the parameters.");
			}

			const routeOrError = await this.routeServiceInstance.deleteRouteById(idParameter);

			if (routeOrError.isFailure) {
				return res.status(404).json(routeOrError.error);
			}

			const routeDTO = routeOrError.getValue();
			return res.status(200).json(routeDTO);
		} catch (e) {
			return next(e);
		}
	}
}
