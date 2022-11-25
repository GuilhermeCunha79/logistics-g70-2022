import {Mapper} from "../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {Route} from "../domain/Route/route";
import IRouteDTO from "../dto/IRouteDTO";
import {RouteId} from "../domain/Route/routeId";
import {RouteOrigin} from "../domain/Route/routeOrigin";
import {RouteDestination} from "../domain/Route/routeDestination";
import {RouteDistance} from "../domain/Route/routeDistance";
import {RouteTimeDistance} from "../domain/Route/routeTimeDistance";
import {RouteEnergySpent} from "../domain/Route/routeEnergySpent";
import {RouteExtraTimeBattery} from "../domain/Route/routeExtraTimeBattery";
import {IRoutePersistence} from "../dataschema/IRoutePersistence";

export class RouteMap extends Mapper<Route> {

	public static toDTO(route: Route): IRouteDTO {
		return {
			routeId: route.routeId.value,
			origin: route.origin.value,
			destination: route.destination.value,
			distance: route.distance.value,
			timeDistance: route.timeDistance.value,
			energySpent: route.energySpent.value,
			extraTimeBattery: route.extraTimeBattery.value
		} as IRouteDTO;
	}

	public static toDomain(raw: any | Model<IRoutePersistence & Document>): Route {
		const routeOrError = Route.create({
				routeId: RouteId.create(raw.routeId).getValue(),
				origin: RouteOrigin.create(raw.origin).getValue(),
				destination: RouteDestination.create(raw.destination).getValue(),
				distance: RouteDistance.create(raw.distance).getValue(),
				timeDistance: RouteTimeDistance.create(raw.timeDistance).getValue(),
				energySpent: RouteEnergySpent.create(raw.energySpent).getValue(),
				extraTimeBattery: RouteExtraTimeBattery.create(raw.extraTimeBattery).getValue()
			}, new UniqueEntityID(raw.domainId)
		);

		routeOrError.isFailure ? console.log(routeOrError.error) : '';
		return routeOrError.isSuccess ? routeOrError.getValue() : null;
	}

	public static toPersistence(route: Route): any {
		return {
			domainId: route.id.toString(),
			routeId: route.routeId.value,
			origin: route.origin.value,
			destination: route.destination.value,
			distance: route.distance.value,
			timeDistance: route.timeDistance.value,
			energySpent: route.energySpent.value,
			extraTimeBattery: route.extraTimeBattery.value
		};
	}
}
