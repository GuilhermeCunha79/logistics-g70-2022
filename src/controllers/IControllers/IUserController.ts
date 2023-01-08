import {NextFunction, Request, Response} from 'express';


export default interface IUserController {
	createUser(req: Request, res: Response, next: NextFunction);

	findUser(req: Request, res: Response, next: NextFunction);

	updateUser(req: Request, res: Response, next: NextFunction);

	deleteUser(req: Request, res: Response, next: NextFunction);

	findAllUsers(req: Request, res: Response, next: NextFunction);

	updateUser(req: Request, res: Response, next: NextFunction);
}
