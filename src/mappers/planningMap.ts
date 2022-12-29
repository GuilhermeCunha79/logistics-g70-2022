import {Mapper} from "../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {Planning} from "../domain/Planning/planning";
import IPlanningDTO from "../dto/IPlanningDTO";
import {IPlanningPersistence} from "../dataschema/IPlanningPersistence";
import {PlanningLicensePlate} from "../domain/Planning/planningLicensePlate";
import {PlanningDate} from "../domain/Planning/planningDate";
import {PlanningWarehouse} from "../domain/Planning/planningWarehouse";

export class PlanningMap extends Mapper<Planning> {

	public static toDTO(planning: Planning): IPlanningDTO {
		return {
			licensePlate: planning.licensePlate.value,
			date: planning.date.value,
			warehouse: planning.warehouse.value
		} as IPlanningDTO;
	}

	public static toDomain(raw: any | Model<IPlanningPersistence & Document>): Planning {
		const planningOrError = Planning.create({
				licensePlate: PlanningLicensePlate.create(raw.licensePlate).getValue(),
				date: PlanningDate.create(raw.date).getValue(),
				warehouse: PlanningWarehouse.create(raw.warehouse).getValue()
			}, new UniqueEntityID(raw.domainId)
		);

		planningOrError.isFailure ? console.log(planningOrError.error) : '';
		return planningOrError.isSuccess ? planningOrError.getValue() : null;
	}

	public static toPersistence(planning: Planning): any {
		return {
			domainId: planning.id.toString(),
			licensePlate: planning.licensePlate.value,
			date: planning.date.value,
			warehouse: planning.warehouse.value
		};
	}
}
