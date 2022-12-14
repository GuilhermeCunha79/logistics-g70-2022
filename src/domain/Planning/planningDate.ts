import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface IPlanningProps {
	value: string;
}

export class PlanningDate extends ValueObject<IPlanningProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(planningDate: string): Result<PlanningDate> {
		return Result.ok<PlanningDate>(new PlanningDate({ value: planningDate }));
	}
}
