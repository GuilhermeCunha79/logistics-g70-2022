import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IRouteDestinationProps {
	value: string;
}

export class RouteDestination extends ValueObject<IRouteDestinationProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(routeDestination: string): Result<RouteDestination> {
		const guardResult = Guard.againstNullOrUndefined(routeDestination, 'routeDestination');

		if (!guardResult.succeeded) {
			return Result.fail<RouteDestination>(guardResult.message);
		} else {
			return Result.ok<RouteDestination>(new RouteDestination({value: routeDestination}))
		}
	}
}
