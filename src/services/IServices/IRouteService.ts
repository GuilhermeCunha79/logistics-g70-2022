import {Result} from '../../core/logic/Result';
import IRouteDTO from "../../dto/IRouteDTO";

export default interface IRouteService {
	createRoute(routeDTO: IRouteDTO): Promise<Result<{ routeDTO: IRouteDTO, token: string }>>;

	updateRoute(routeDTO: IRouteDTO): Promise<Result<{ routeDTO: IRouteDTO, token: string }>>;

	getRouteById(routeId: string): Promise<Result<IRouteDTO>>;

	getRouteByOriginAndDestination(origin: string, destination: string): Promise<Result<IRouteDTO>>;

	getRouteByOriginOrDestination(location: string, origin: boolean): Promise<Result<IRouteDTO[]>>;

	getAllRoutes(): Promise<Result<IRouteDTO[]>>;

	deleteRouteById(routeId: string): Promise<Result<{ routeDTO: IRouteDTO, token: string }>>;
}
