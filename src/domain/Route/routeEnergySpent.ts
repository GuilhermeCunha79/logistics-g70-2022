import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IEnergySpentProps {
	value: number;
}

export class RouteEnergySpent extends ValueObject<IEnergySpentProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(energySpent: number): Result<RouteEnergySpent> {
		const guardResult = Guard.againstNullOrUndefined(energySpent, 'routeEnergySpent');

		if (!guardResult.succeeded) {
			return Result.fail<RouteEnergySpent>(guardResult.message);
		} else if (energySpent < 0) {
			return Result.fail<RouteEnergySpent>("EnergySpent can't have a negative value.");
		} else {
			return Result.ok<RouteEnergySpent>(new RouteEnergySpent({value: energySpent}))
		}
	}
}
