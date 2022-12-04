import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';

interface IPlanningDeliveryProps {
	value: string [][];
}

export class PlanningDelivery extends ValueObject<IPlanningDeliveryProps> {

	get value(): string[][] {
		return this.props.value;
	}

	private constructor(props: IPlanningDeliveryProps) {
		super(props);
	}

	public static create(delivery: string[][]): Result<PlanningDelivery> {
		return Result.ok<PlanningDelivery>(new PlanningDelivery({value: delivery}));
	}
}
