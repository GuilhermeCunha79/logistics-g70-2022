import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IRouteController from "../../controllers/IControllers/IRouteController";

const route = Router();

export default (app: Router) => {
	app.use('/route', route);

	const ctrl = Container.get(config.controllers.route.name) as IRouteController;

	route.post('',
		celebrate({
			body: Joi.object({
				routeId: Joi.string().required(),
				origin: Joi.string().required(),
				destination: Joi.string().required(),
				distance: Joi.number().required().min(0),
				timeDistance: Joi.number().required().min(0),
				energySpent: Joi.number().required().min(0),
				extraBatteryTime: Joi.number().required().min(0)
			})
		}),
		(req, res, next) => ctrl.createRoute(req, res, next));

	route.get('', (req, res, next) => ctrl.findRoutes(req, res, next));

	route.put('',
		celebrate({
			body: Joi.object({
				routeId: Joi.string().required(),
				origin: Joi.string().required(),
				destination: Joi.string().required(),
				distance: Joi.number().min(0),
				timeDistance: Joi.number().min(0),
				energySpent: Joi.number().min(0),
				extraBatteryTime: Joi.number().min(0)
			})
		}),
		(req, res, next) => ctrl.updateRoute(req, res, next));

	route.delete('', (req, res, next) => ctrl.deleteRouteById(req, res, next));
}
