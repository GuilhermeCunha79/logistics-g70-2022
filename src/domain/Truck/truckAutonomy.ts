import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IAutonomyProps {
	value: number;
}

export class TruckAutonomy extends ValueObject<IAutonomyProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(autonomy: number): Result<TruckAutonomy> {
		const guardResult = Guard.againstNullOrUndefined(autonomy, 'autonomy');

		if (!guardResult.succeeded) {
			return Result.fail<TruckAutonomy>(guardResult.message);
		} else if (autonomy < 0) {
			return Result.fail<TruckAutonomy>("Autonomy can't have a negative value.");
		} else {
			return Result.ok<TruckAutonomy>(new TruckAutonomy({value: autonomy}))
		}
	}
}
