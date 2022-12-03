import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ICapacityTransportationProps {
	value: number;
}

export class TruckCapacityTransportation extends ValueObject<ICapacityTransportationProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(capacityTransportation: number): Result<TruckCapacityTransportation> {
		const guardResult = Guard.againstNullOrUndefined(capacityTransportation, 'capacityTransportation');

		if (!guardResult.succeeded) {
			return Result.fail<TruckCapacityTransportation>(guardResult.message);
		} else if (capacityTransportation < 0) {
			return Result.fail<TruckCapacityTransportation>("CapacityTransportation can't have a negative value.");
		} else {
			return Result.ok<TruckCapacityTransportation>(new TruckCapacityTransportation({value: capacityTransportation}))
		}
	}
}
