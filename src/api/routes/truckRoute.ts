import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import ITruckController from "../../controllers/IControllers/ITruckController";

const route = Router();

export default (app: Router) => {
	app.use('/truck', route);

	const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

	route.post('',
		celebrate({
			body: Joi.object({
				licensePlate: Joi.string().regex(/([A-Z]{2}|[0-9]{2})-([A-Z]{2}|[0-9]{2})-([A-Z]{2}|[0-9]{2})/).required(),
				autonomy: Joi.number().required().min(0),
				capacityCargo: Joi.number().required().min(0),
				capacityTransportation: Joi.number().required().min(0),
				battery: Joi.number().required().min(0),
				tare: Joi.number().required().min(0)
			})
		}),
		(req, res, next) => ctrl.createTruck(req, res, next));

	route.get('', (req, res, next) => ctrl.findTruckById(req, res, next));

	route.get('/all', (req, res, next) => ctrl.findAllTrucks(req, res, next));

	route.put('',
		celebrate({
			body: Joi.object({
				licensePlate: Joi.string().regex(/([A-Z]{2}|[0-9]{2})-([A-Z]{2}|[0-9]{2})-([A-Z]{2}|[0-9]{2})/).required(),
				autonomy: Joi.number().min(0),
				capacityCargo: Joi.number().min(0),
				capacityTransportation: Joi.number().min(0),
				battery: Joi.number().min(0),
				tare: Joi.number().min(0)
			})
		}),
		(req, res, next) => ctrl.updateTruck(req, res, next));

	route.delete('', (req, res, next) => ctrl.deleteTruckById(req, res, next));


	route.patch('/status',
		celebrate({
			params: Joi.object({
				licensePlate: Joi.string().required()
			})
		}), (req, res, next) => ctrl.changeStatus(req, res, next));

	route.patch('/del', (req, res, next) => ctrl.softDelete(req, res, next));



}
