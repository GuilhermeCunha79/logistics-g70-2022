import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IPlanningController from "../../controllers/IControllers/IPlanningController";

const planningRoute = Router();

export default (app: Router) => {
	app.use('/planning', planningRoute);

	const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

	planningRoute.post('',
		celebrate({
			body: Joi.object({
				licensePlate: Joi.string().required(),
				date: Joi.string().required(),
				heuristic: Joi.string().required()
			})
		}),
		(req, res, next) => ctrl.createPlanning(req, res, next));

	planningRoute.get('', (req, res, next) => ctrl.findPlanning(req, res, next));

	planningRoute.put('',
		celebrate({
			body: Joi.object({
				licensePlate: Joi.string().required(),
				date: Joi.string().required()
			})
		}),
		(req, res, next) => ctrl.updatePlanning(req, res, next));

	planningRoute.delete('', (req, res, next) => ctrl.deletePlanning(req, res, next));
}
