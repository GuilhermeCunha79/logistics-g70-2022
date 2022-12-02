import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IBatteryProps {
	value: number;
}

export class TruckBattery extends ValueObject<IBatteryProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(battery: number): Result<TruckBattery> {
		const guardResult = Guard.againstNullOrUndefined(battery, 'battery');

		if (!guardResult.succeeded) {
			return Result.fail<TruckBattery>(guardResult.message);
		} else if (battery < 0) {
			return Result.fail<TruckBattery>("Battery can't have a negative value.");
		} else {
			return Result.ok<TruckBattery>(new TruckBattery({value: battery}))
		}
	}
}
