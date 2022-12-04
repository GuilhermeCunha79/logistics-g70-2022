import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';

interface IPlanningLicensePlateProps {
	value: string;
}

export class PlanningLicensePlate extends ValueObject<IPlanningLicensePlateProps> {

	get value(): string {
		return this.props.value;
	}

	private constructor(props: IPlanningLicensePlateProps) {
		super(props);
	}

	public static create(licensePlate: string): Result<PlanningLicensePlate> {
		return Result.ok<PlanningLicensePlate>(new PlanningLicensePlate({value: licensePlate}));
	}
}
