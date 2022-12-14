import {Result} from '../../core/logic/Result';
import IPlanningDTO from "../../dto/IPlanningDTO";

export default interface IPlanningService {
	createPlanning(planningDTO: IPlanningDTO, heuristic: string): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>>;

	getPlanning(query?: any): Promise<Result<IPlanningDTO[]>>;

	updatePlanning(planningDTO: IPlanningDTO): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>>;

	deletePlanning(id: string): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>>;
}
