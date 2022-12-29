import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";

import IUserService from "../services/IServices/IUserService";
import IUserController from "./IControllers/IUserController";
import IUserDTO from "../dto/IUserDTO";

@Service()
export default class UserController implements IUserController {
	constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) {
	}

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<{ userDTO: IUserDTO, token: string }>;

			if (userOrError.isFailure) {
				return res.status(400).json(userOrError.error);
			}

			const userDTO = userOrError.getValue();
			return res.status(201).json(userDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async findUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.licensePlate as string;

			let userOrError;

			if (!emailParameter) {
				userOrError = await this.userServiceInstance.getUser() as Result<IUserDTO[]>;
			}

			if (emailParameter) {
				userOrError = await this.userServiceInstance.getUser({email: emailParameter});
			}

			if (userOrError.isFailure) {
				return res.status(404).json(userOrError.error);
			}

			const userDTO = userOrError.getValue();
			return res.status(200).json(userDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async updateUser(req: Request, res: Response, next: NextFunction) {
	}

	public async deleteUser(req: Request, res: Response, next: NextFunction) {
	}
}
