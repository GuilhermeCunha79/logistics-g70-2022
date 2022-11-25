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

	public async findRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;
			const originParameter = req.query.origin as string;
			const destinationParameter = req.query.destination as string;

			if (!idParameter && !originParameter && !destinationParameter) {
				return res.status(400).json("Please insert a search parameter.");
			}

			let routeOrError;

			if (idParameter) {
				routeOrError = await this.routeServiceInstance.getRouteById(idParameter);
			} else if (originParameter && !destinationParameter) {
				routeOrError = await this.routeServiceInstance.getRouteByOriginOrDestination(originParameter, true);
			} else if (!originParameter && destinationParameter) {
				routeOrError = await this.routeServiceInstance.getRouteByOriginOrDestination(destinationParameter, false);
			} else {
				routeOrError = await this.routeServiceInstance.getRouteByOriginAndDestination(originParameter, destinationParameter);
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

	public async findAllRoutes(req: Request, res: Response, next: NextFunction) {
		try {
			const routeOrError = await this.routeServiceInstance.getAllRoutes() as Result<IRouteDTO[]>;

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
			const idParameter = req.query.id as string;

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
