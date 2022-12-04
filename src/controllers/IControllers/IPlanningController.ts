import {NextFunction, Request, Response} from 'express';

export default interface IPlanningController {
	createPlanning(req: Request, res: Response, next: NextFunction);

	findPlanning(req: Request, res: Response, next: NextFunction);

	updatePlanning(req: Request, res: Response, next: NextFunction);

	deletePlanning(req: Request, res: Response, next: NextFunction);
}
