import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {Planning} from "../domain/Planning/planning";
import IPlanningRepo from "./IRepos/IPlanningRepo";
import {IPlanningPersistence} from "../dataschema/IPlanningPersistence";
import { PlanningMap } from "../mappers/planningMap";

@Service()
export default class PlanningRepo implements IPlanningRepo {

	constructor(@Inject('planningSchema') private planningSchema: Model<IPlanningPersistence & Document>) {
	}

	exists(t: Planning): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async save(planning: Planning): Promise<Planning>{
		const query = {licensePlate: planning.licensePlate.value, date: planning.date.value};
		const planningDocument = await this.planningSchema.findOne(query);

		try {
			if (planningDocument === null) {
				const rawPlanning: any = PlanningMap.toPersistence(planning);
				const planningCreated = await this.planningSchema.create(rawPlanning);
				return PlanningMap.toDomain(planningCreated);
			} else {
				planningDocument.licensePlate = planning.licensePlate.value;
				planningDocument.date = planning.date.value;

				await planningDocument.save();
				return planning;
			}
		} catch (err) {
			throw err;
		}
	}

	public async find(query?: any): Promise<Planning[]>{
		const planningRecord = await this.planningSchema.find(query);

		if (planningRecord != null) {
			return (planningRecord.map((postRecord) => PlanningMap.toDomain(postRecord)));
		}
		return null;
	}

	public async delete(planningId: string): Promise<Planning>{
		throw new Error('Method not implemented.');
	}
}
