import {Result} from '../../core/logic/Result';
import IRouteDTO from "../../dto/IRouteDTO";

export default interface IRouteService {
	createRoute(routeDTO: IRouteDTO): Promise<Result<{ routeDTO: IRouteDTO, token: string }>>;

	getRoutes(query?: any): Promise<Result<IRouteDTO[]>>;

	updateRoute(routeDTO: IRouteDTO): Promise<Result<{ routeDTO: IRouteDTO, token: string }>>;

	deleteRouteById(routeId: string): Promise<Result<{ routeDTO: IRouteDTO, token: string }>>;
}
