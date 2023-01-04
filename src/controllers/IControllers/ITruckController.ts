import {NextFunction, Request, Response} from 'express';

export default interface ITruckController {
	createTruck(req: Request, res: Response, next: NextFunction);

	findTruckById(req: Request, res: Response, next: NextFunction);

	findAllTrucks(req: Request, res: Response, next: NextFunction);

	updateTruck(req: Request, res: Response, next: NextFunction);

	deleteTruckById(req: Request, res: Response, next: NextFunction);

	changeStatus(req: Request, res: Response, next: NextFunction);

	softDelete(req: Request, res: Response, next: NextFunction);
}
