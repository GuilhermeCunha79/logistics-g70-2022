import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface IPlanningWarehouseProps {
	value: string;
}

export class PlanningWarehouse extends ValueObject<IPlanningWarehouseProps> {

	get value(): string {
		return this.props.value;
	}

	private constructor(props: IPlanningWarehouseProps) {
		super(props);
	}

	public static create(warehouse: string): Result<PlanningWarehouse> {
		return Result.ok<PlanningWarehouse>(new PlanningWarehouse({ value: warehouse }));
	}
}
