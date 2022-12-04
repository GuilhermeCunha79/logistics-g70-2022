import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';

interface IPlanningProps {
	value: number;
}

export class PlanningDate extends ValueObject<IPlanningProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(planningDate: number): Result<PlanningDate> {
		if (planningDate < PlanningDate.todayDate()) {
			return Result.fail<PlanningDate>("Invalid Date.\n");
		} else {
			return Result.ok<PlanningDate>(new PlanningDate({value: planningDate}))
		}
	}

	public static todayDate(): number {
		const today = new Date();

		let day = today.getFullYear() * 10000;
		day += today.getMonth() * 100;
		day += today.getDay();

		return day;
	}
}
