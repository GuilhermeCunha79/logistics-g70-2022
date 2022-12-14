import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";

import IPlanningDTO from "../dto/IPlanningDTO";
import { PlanningLicensePlate } from "../domain/Planning/planningLicensePlate";
import { PlanningDate } from "../domain/Planning/planningDate";
import { PlanningWarehouse } from "../domain/Planning/planningWarehouse";
import { Planning } from "../domain/Planning/planning";
import { PlanningId } from "../domain/Planning/planningId";
import IPlanningService from "./IServices/IPlanningService";
import IPlanningRepo from "../repos/IRepos/IPlanningRepo";
import { PlanningMap } from "../mappers/PlanningMap";
import fetch = require("node-fetch");

@Service()
export default class PlanningService implements IPlanningService {
	constructor(@Inject(config.repos.planning.name) private planningRepo: IPlanningRepo) {
	}

	public async createPlanning(planningDTO: IPlanningDTO, heuristic: string): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>> {
		try {
			console.log(planningDTO)
			//console.log(heuristic)

			// let planningDocument = (await this.planningRepo.find({ planningId: planningDTO.planningId }))[0];
			//
			// if (planningDocument != null) {
			// 	return Result.fail<{ planningDTO: IPlanningDTO, token: string }>("Planning already exists with id=" + planningDTO.planningId);
			// }

			const date = planningDTO.date.toString().replace(/-/g, "");

			let planningDocument = (await this.planningRepo.find({ licensePlate: planningDTO.licensePlate, date: date }))[0];

			if (planningDocument != null) {
				return Result.fail<{ planningDTO: IPlanningDTO, token: string }>("Planning already exists with date=" + date + " and licencePlate=" + planningDTO.licensePlate);
			}

			const url = "http://vs576.dei.isep.ipp.pt:8888/";
			//const url = "http://localhost:8888/";
			const path = url.concat("getPlanning?date="+ date +"&truck=eTruck01&heuristic=" + heuristic);

			const res = await fetch(path);
			const data = await res.json();
			console.log(data);

			const planningOrError = await Planning.create({
				// planningId: PlanningId.create(planningDTO.planningId).getValue(),
				licensePlate: PlanningLicensePlate.create(planningDTO.licensePlate).getValue(),
				date: PlanningDate.create(planningDTO.date).getValue(),
				warehouse: PlanningWarehouse.create(data[1].toString()).getValue()
				//delivery: PlanningDelivery.create(planningDTO.delivery).getValue() //TODO:???
			});

			if (planningOrError.isFailure) {
				return Result.fail<{ planningDTO: IPlanningDTO, token: string }>(planningOrError.errorValue());
			}

			const planningResult = planningOrError.getValue();

			await this.planningRepo.save(planningResult);
			const planningDTOResult = PlanningMap.toDTO(planningResult) as IPlanningDTO;
			return Result.ok<{ planningDTO: IPlanningDTO, token: string }>({
				planningDTO: planningDTOResult,
				token: "Planning created successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async getPlanning(query?: any): Promise<Result<IPlanningDTO[]>> {
		try {
			const planningList = await this.planningRepo.find(query);

			if (planningList.length == 0) {
				return Result.fail<IPlanningDTO[]>("Planning not found.");
			}

			const result = planningList.map((planningList) => PlanningMap.toDTO(planningList) as IPlanningDTO);
			return Result.ok<IPlanningDTO[]>(result);
		} catch (e) {
			throw e;
		}
	}

	public async updatePlanning(planningDTO: IPlanningDTO): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>> {
		return null;
	}

	public async deletePlanning(id: string): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>> {
		return null;
	}
}
