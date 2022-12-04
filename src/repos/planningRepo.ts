import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {Planning} from "../domain/Planning/planning";
import IPlanningRepo from "./IRepos/IPlanningRepo";
import {IPlanningPersistence} from "../dataschema/IPlanningPersistence";

@Service()
export default class PlanningRepo implements IPlanningRepo {

	constructor(@Inject('planningSchema') private planningSchema: Model<IPlanningPersistence & Document>) {
	}

	exists(t: Planning): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async save(planning: Planning): Promise<Planning>{
		//TODO
		throw new Error('Method not implemented.');
	}

	public async find(query?: any): Promise<Planning[]>{
		throw new Error('Method not implemented.');
	}

	public async delete(planningId: string): Promise<Planning>{
		throw new Error('Method not implemented.');
	}
}
