import {NextFunction, Request, Response} from 'express';

export default interface IRouteController {
	createRoute(req: Request, res: Response, next: NextFunction);

	findRoute(req: Request, res: Response, next: NextFunction);

	findAllRoutes(req: Request, res: Response, next: NextFunction);

	updateRoute(req: Request, res: Response, next: NextFunction);

	deleteRouteById(req: Request, res: Response, next: NextFunction);
}
