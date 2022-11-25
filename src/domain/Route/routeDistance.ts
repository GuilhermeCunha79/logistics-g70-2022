import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IDistanceProps {
	value: number;
}

export class RouteDistance extends ValueObject<IDistanceProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(distance: number): Result<RouteDistance> {
		const guardResult = Guard.againstNullOrUndefined(distance, 'routeDistance');

		if (!guardResult.succeeded) {
			return Result.fail<RouteDistance>(guardResult.message);
		} else if (distance < 0) {
			return Result.fail<RouteDistance>("Distance can't have a negative value.");
		} else {
			return Result.ok<RouteDistance>(new RouteDistance({value: distance}))
		}
	}
}
