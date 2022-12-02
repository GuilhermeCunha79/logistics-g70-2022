import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {Route} from "../domain/Route/route";
import {RouteMap} from "../mappers/routeMap";
import IRouteRepo from "./IRepos/IRouteRepo";
import {IRoutePersistence} from "../dataschema/IRoutePersistence";

@Service()
export default class RouteRepo implements IRouteRepo {

	constructor(@Inject('routeSchema') private routeSchema: Model<IRoutePersistence & Document>) {
	}

	exists(t: Route): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async save(route: Route): Promise<Route> {
		const query = {routeId: route.routeId.value};
		const routeDocument = await this.routeSchema.findOne(query);

		try {
			if (routeDocument === null) {
				const rawRoute: any = RouteMap.toPersistence(route);
				const routeCreated = await this.routeSchema.create(rawRoute);
				return RouteMap.toDomain(routeCreated);
			} else {
				routeDocument.origin = route.origin.value;
				routeDocument.destination = route.destination.value;
				routeDocument.distance = route.distance.value;
				routeDocument.timeDistance = route.timeDistance.value;
				routeDocument.energySpent = route.energySpent.value;
				routeDocument.extraBatteryTime = route.extraBatteryTime.value;

				await routeDocument.save();
				return route;
			}
		} catch (err) {
			throw err;
		}
	}

	public async find(query?: any): Promise<Route[]> {
		const routeRecord = await this.routeSchema.find(query);

		if (routeRecord != null) {
			return (routeRecord.map((postRecord) => RouteMap.toDomain(postRecord)));
		}
		return null;
	}

	public async delete(routeId: string): Promise<Route> {
		const routeDocument = await this.routeSchema.findOne({routeId: routeId});

		if (routeDocument != null) {
			routeDocument.remove();
			return RouteMap.toDomain(routeDocument);
		}
		return null;
	}
}
