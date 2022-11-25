import {Repo} from "../../core/infra/Repo";
import {Route} from "../../domain/Route/route";

export default interface IRouteRepo extends Repo<Route> {
	save(route: Route): Promise<Route>;

	findByDomainId(routeId: string): Promise<Route>;

	findByOriginAndDestination(origin: string, destination: string): Promise<Route>;

	findByOriginOrDestination(location: string, origin: boolean): Promise<Route[]>;

	findAll(): Promise<Route[]>

	delete(routeId: string): Promise<Route>;
}
