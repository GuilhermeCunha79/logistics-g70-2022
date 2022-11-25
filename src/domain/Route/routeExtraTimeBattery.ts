import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IExtraTimeBatteryProps {
	value: number;
}

export class RouteExtraTimeBattery extends ValueObject<IExtraTimeBatteryProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(extraTimeBattery: number): Result<RouteExtraTimeBattery> {
		const guardResult = Guard.againstNullOrUndefined(extraTimeBattery, 'routeExtraTimeBattery');

		if (!guardResult.succeeded) {
			return Result.fail<RouteExtraTimeBattery>(guardResult.message);
		} else if (extraTimeBattery < 0) {
			return Result.fail<RouteExtraTimeBattery>("ExtraTimeBattery can't have a negative value.");
		} else {
			return Result.ok<RouteExtraTimeBattery>(new RouteExtraTimeBattery({value: extraTimeBattery}))
		}
	}
}
