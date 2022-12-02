import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IExtraBatteryTimeProps {
	value: number;
}

export class RouteExtraBatteryTime extends ValueObject<IExtraBatteryTimeProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(extraBatteryTime: number): Result<RouteExtraBatteryTime> {
		const guardResult = Guard.againstNullOrUndefined(extraBatteryTime, 'routeExtraBatteryTime');

		if (!guardResult.succeeded) {
			return Result.fail<RouteExtraBatteryTime>(guardResult.message);
		} else if (extraBatteryTime < 0) {
			return Result.fail<RouteExtraBatteryTime>("ExtraBatteryTime can't have a negative value.");
		} else {
			return Result.ok<RouteExtraBatteryTime>(new RouteExtraBatteryTime({value: extraBatteryTime}))
		}
	}
}
