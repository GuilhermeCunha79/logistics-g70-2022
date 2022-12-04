import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IPlanningIdProps {
	value: string;
}

export class PlanningId extends ValueObject<IPlanningIdProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(planningId: string): Result<PlanningId> {
		const guardResult = Guard.againstNullOrUndefined(planningId, 'planningId');

		if (!guardResult.succeeded) {
			return Result.fail<PlanningId>(guardResult.message);
		} else {
			return Result.ok<PlanningId>(new PlanningId({value: planningId}));
		}
	}
}
