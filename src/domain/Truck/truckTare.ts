import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ITareProps {
	value: number;
}

export class TruckTare extends ValueObject<ITareProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(tare: number): Result<TruckTare> {
		const guardResult = Guard.againstNullOrUndefined(tare, 'tare');

		if (!guardResult.succeeded) {
			return Result.fail<TruckTare>(guardResult.message);
		} else if (tare < 0) {
			return Result.fail<TruckTare>("TruckTare can't have a negative value.");
		} else {
			return Result.ok<TruckTare>(new TruckTare({value: tare}))
		}
	}
}
