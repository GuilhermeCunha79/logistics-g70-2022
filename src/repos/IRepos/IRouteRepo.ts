import {Repo} from "../../core/infra/Repo";
import {Route} from "../../domain/Route/route";

export default interface IRouteRepo extends Repo<Route> {
	save(route: Route): Promise<Route>;

	find(query?: any): Promise<Route[]>

	delete(routeId: string): Promise<Route>;
}
