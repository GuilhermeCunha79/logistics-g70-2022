import { expect } from 'chai';
import {Route} from "../../../src/domain/Route/route";
import {RouteId} from "../../../src/domain/Route/routeId";
import {RouteOrigin} from "../../../src/domain/Route/routeOrigin";
import {RouteDestination} from "../../../src/domain/Route/routeDestination";
import {RouteDistance} from "../../../src/domain/Route/routeDistance";
import {RouteTimeDistance} from "../../../src/domain/Route/routeTimeDistance";
import {RouteEnergySpent} from "../../../src/domain/Route/routeEnergySpent";
import {RouteExtraBatteryTime} from "../../../src/domain/Route/routeExtraBatteryTime";

describe('Create a valid truck', () => {
	const routeId = "111";
	const origin = "ABC";
	const destination = "DEF";
	const distance = 10;
	const timeDistance = 10;
	const energySpent = 10;
	const extraBatteryTime = 10;

	const invalidDistance = -10;
	const invalidTimeDistance = -10;
	const invalidEnergySpent = -10;
	const invalidExtraBatteryTime = -10;

	const route = Route.create({
		routeId: RouteId.create(routeId).getValue(),
		origin: RouteOrigin.create(origin).getValue(),
		destination: RouteDestination.create(destination).getValue(),
		distance: RouteDistance.create(distance).getValue(),
		timeDistance: RouteTimeDistance.create(timeDistance).getValue(),
		energySpent: RouteEnergySpent.create(energySpent).getValue(),
		extraBatteryTime: RouteExtraBatteryTime.create(extraBatteryTime).getValue()
	});

	// Same origin and destination
	it('Invalid route', () => {
		const errorRoute = Route.create({
			routeId: RouteId.create(routeId).getValue(),
			origin: RouteOrigin.create(origin).getValue(),
			destination: RouteOrigin.create(origin).getValue(),
			distance: RouteDistance.create(distance).getValue(),
			timeDistance: RouteTimeDistance.create(timeDistance).getValue(),
			energySpent: RouteEnergySpent.create(energySpent).getValue(),
			extraBatteryTime: RouteExtraBatteryTime.create(extraBatteryTime).getValue()
		});
		expect(true).to.equal(errorRoute.isFailure);
	});

	it('Valid distance', () => {
		expect(route.getValue().distance.value).to.equal(distance);
	});
	//Negative distance
	it('Invalid distance', () => {
		const errorDistance = RouteDistance.create(invalidDistance);
		expect(true).to.equal(errorDistance.isFailure);
	});

	it('Valid time distance', () => {
		expect(route.getValue().timeDistance.value).to.equal(timeDistance);
	});
	//Negative time distance
	it('Invalid time distance', () => {
		const errorTimeDistance = RouteTimeDistance.create(invalidTimeDistance);
		expect(true).to.equal(errorTimeDistance.isFailure);
	});

	it('Valid energy spent', () => {
		expect(route.getValue().energySpent.value).to.equal(energySpent);
	});
	//Negative energy spent
	it('Invalid energy spent', () => {
		const errorEnergySpent = RouteEnergySpent.create(invalidEnergySpent);
		expect(true).to.equal(errorEnergySpent.isFailure);
	});

	it('Valid extra time battery', () => {
		expect(route.getValue().extraBatteryTime.value).to.equal(extraBatteryTime);
	});
	//Negative extra time battery
	it('Invalid extra time battery', () => {
		const errorExtraBatteryTime = RouteExtraBatteryTime.create(invalidExtraBatteryTime);
		expect(true).to.equal(errorExtraBatteryTime.isFailure);
	});
});
