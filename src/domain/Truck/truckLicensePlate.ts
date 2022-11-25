import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface ILicensePlateProps {
	value: string;
}

export class TruckLicensePlate extends ValueObject<ILicensePlateProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(licensePlate: string): Result<TruckLicensePlate> {
		const guardResult = Guard.againstNullOrUndefined(licensePlate, 'licensePlate');

		if (!guardResult.succeeded) {
			return Result.fail<TruckLicensePlate>(guardResult.message);
		} else {
			return Result.ok<TruckLicensePlate>(new TruckLicensePlate({value: licensePlate}))
		}
	}
}
