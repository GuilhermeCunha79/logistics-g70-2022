import {NextFunction, Request, Response} from 'express';

export default interface IRouteController {
	createRoute(req: Request, res: Response, next: NextFunction);

	findRoutes(req: Request, res: Response, next: NextFunction);

	updateRoute(req: Request, res: Response, next: NextFunction);

	deleteRouteById(req: Request, res: Response, next: NextFunction);
}
