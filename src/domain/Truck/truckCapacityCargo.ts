import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ICapacityCargoProps {
	value: number;
}

export class TruckCapacityCargo extends ValueObject<ICapacityCargoProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(capacityCargo: number): Result<TruckCapacityCargo> {
		const guardResult = Guard.againstNullOrUndefined(capacityCargo, 'capacityCargo');

		if (!guardResult.succeeded) {
			return Result.fail<TruckCapacityCargo>(guardResult.message);
		} else if (capacityCargo < 0) {
			return Result.fail<TruckCapacityCargo>("CapacityCargo can't have a negative value.");
		} else {
			return Result.ok<TruckCapacityCargo>(new TruckCapacityCargo({value: capacityCargo}))
		}
	}
}
