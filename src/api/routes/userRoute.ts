import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IUserController from "../../controllers/IControllers/IUserController";

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const ctrl = Container.get(config.controllers.user.name) as IUserController;

	userRoute.post('',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required(),
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				phoneNumber: Joi.string().required(),
				role: Joi.number().required(),
			})
		}),
		(req, res, next) => ctrl.createUser(req, res, next));

	userRoute.get('', (req, res, next) => ctrl.findUser(req, res, next));

	userRoute.get('/all', (req, res, next) => ctrl.findAllUsers(req, res, next));

	userRoute.put('',
		celebrate({
			body: Joi.object({
				email: Joi.string(),
				password: Joi.string(),
				firstName: Joi.string(),
				lastName: Joi.string(),
				phoneNumber: Joi.string(),
				role: Joi.number(),
			})
		}),
		(req, res, next) => ctrl.updateUser(req, res, next));



	userRoute.delete('', (req, res, next) => ctrl.deleteUser(req, res, next));
}
