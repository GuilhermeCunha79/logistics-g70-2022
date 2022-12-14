import {AggregateRoot} from '../../core/domain/AggregateRoot';
import {UniqueEntityID} from '../../core/domain/UniqueEntityID';
import {Result} from '../../core/logic/Result';
import {Guard} from '../../core/logic/Guard';
import {PlanningDate} from "./planningDate";
import {PlanningWarehouse} from "./planningWarehouse";
import {PlanningId} from "./planningId";
import {PlanningLicensePlate} from "./planningLicensePlate";

interface PlanningProps {
	// planningId: PlanningId;
	licensePlate: PlanningLicensePlate;
	date: PlanningDate;
	warehouse:PlanningWarehouse;
	//delivery: PlanningDelivery; //TODO:???
}

export class Planning extends AggregateRoot<PlanningProps> {
	get id(): UniqueEntityID {
		return this._id;
	}

	// get planningId(): PlanningId {
	// 	return this.props.planningId;
	// }

	get licensePlate(): PlanningLicensePlate {
		return this.props.licensePlate;
	}

	get date(): PlanningDate {
		return this.props.date;
	}

	get warehouse(): PlanningWarehouse {
		return this.props.warehouse;
	}

	/*get delivery(): PlanningDelivery {
		return this.props.delivery;
	}*/ //TODO:???

	private constructor(props: PlanningProps, id?: UniqueEntityID) {
		super(props, id);
	}

	public static create(props: PlanningProps, id?: UniqueEntityID): Result<Planning> {
		const guardedProps = [
			// {argument: props.planningId, argumentName: 'planningId'},
			{argument: props.licensePlate, argumentName: 'licensePlate'},
			{argument: props.date, argumentName: 'date'},
			{argument: props.warehouse, argumentName: 'warehouse'}
			//{argument: props.delivery, argumentName: 'delivery'} //TODO:???
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<Planning>(guardResult.message);
		} else {
			const planning = new Planning({...props}, id);
			return Result.ok<Planning>(planning);
		}
	}
}
