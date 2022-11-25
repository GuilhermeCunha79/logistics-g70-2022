import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IRouteOriginProps {
	value: string;
}

export class RouteOrigin extends ValueObject<IRouteOriginProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(routeOrigin: string): Result<RouteOrigin> {
		const guardResult = Guard.againstNullOrUndefined(routeOrigin, 'routeOrigin');

		if (!guardResult.succeeded) {
			return Result.fail<RouteOrigin>(guardResult.message);
		} else {
			return Result.ok<RouteOrigin>(new RouteOrigin({value: routeOrigin}))
		}
	}
}
