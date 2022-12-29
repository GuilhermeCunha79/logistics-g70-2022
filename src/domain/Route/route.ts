import {AggregateRoot} from '../../core/domain/AggregateRoot';
import {UniqueEntityID} from '../../core/domain/UniqueEntityID';
import {Result} from '../../core/logic/Result';
import {Guard} from '../../core/logic/Guard';

import {RouteId} from "./routeId";
import {RouteOrigin} from "./routeOrigin";
import {RouteDestination} from "./routeDestination";
import {RouteDistance} from "./routeDistance";
import {RouteTimeDistance} from "./routeTimeDistance";
import {RouteEnergySpent} from "./routeEnergySpent";
import {RouteExtraBatteryTime} from "./routeExtraBatteryTime";

interface RouteProps {
	routeId: RouteId;
	origin: RouteOrigin;
	destination: RouteDestination;
	distance: RouteDistance;
	timeDistance: RouteTimeDistance;
	energySpent: RouteEnergySpent;
	extraBatteryTime: RouteExtraBatteryTime;
}

export class Route extends AggregateRoot<RouteProps> {
	get id(): UniqueEntityID {
		return this._id;
	}

	get routeId(): RouteId {
		return this.props.routeId;
	}

	get origin(): RouteOrigin {
		return this.props.origin;
	}

	get destination(): RouteDestination {
		return this.props.destination;
	}

	get distance(): RouteDistance {
		return this.props.distance;
	}

	get timeDistance(): RouteDistance {
		return this.props.timeDistance;
	}

	get energySpent(): RouteEnergySpent {
		return this.props.energySpent;
	}

	get extraBatteryTime(): RouteExtraBatteryTime {
		return this.props.extraBatteryTime;
	}

	set origin(value: RouteOrigin) {
		this.props.origin = value;
	}

	set destination(value: RouteDestination) {
		this.props.destination = value;
	}

	set distance(value: RouteDistance) {
		this.props.distance = value;
	}

	set timeDistance(value: RouteDistance) {
		this.props.timeDistance = value;
	}

	set energySpent(value: RouteEnergySpent) {
		this.props.energySpent = value;
	}

	set extraBatteryTime(value: RouteExtraBatteryTime) {
		this.props.extraBatteryTime = value;
	}

	private constructor(props: RouteProps, id?: UniqueEntityID) {
		super(props, id);
	}

	public static create(props: RouteProps, id?: UniqueEntityID): Result<Route> {
		const guardedProps = [
			{argument: props.routeId, argumentName: 'routeId'},
			{argument: props.origin, argumentName: 'origin'},
			{argument: props.destination, argumentName: 'destination'},
			{argument: props.distance, argumentName: 'distance'},
			{argument: props.timeDistance, argumentName: 'timeDistance'},
			{argument: props.energySpent, argumentName: 'energySpent'},
			{argument: props.extraBatteryTime, argumentName: 'extraBatteryTime'}
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<Route>(guardResult.message);
		} else if (props.origin.value == props.destination.value) {
			return Result.fail<Route>("Origin and Destination can't be the same.");
		} else {
			const route = new Route({...props}, id);
			return Result.ok<Route>(route);
		}
	}
}
