import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface ITimeDistanceProps {
	value: number;
}

export class RouteTimeDistance extends ValueObject<ITimeDistanceProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(timeDistance: number): Result<RouteTimeDistance> {
		const guardResult = Guard.againstNullOrUndefined(timeDistance, 'routeTimeDistance');

		if (!guardResult.succeeded) {
			return Result.fail<RouteTimeDistance>(guardResult.message);
		} else if (timeDistance < 0) {
			return Result.fail<RouteTimeDistance>("TimeDistance can't have a negative value.");
		} else {
			return Result.ok<RouteTimeDistance>(new RouteTimeDistance({value: timeDistance}))
		}
	}
}
