import {Repo} from "../../core/infra/Repo";
import {Planning} from "../../domain/Planning/planning";

export default interface IPlanningRepo extends Repo<Planning> {
	save(planning: Planning): Promise<Planning>;

	find(query?: any): Promise<Planning[]>;

	delete(planningId: string): Promise<Planning>;
}
