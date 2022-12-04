import {Inject, Service} from "typedi";
import config from "../../config";
import {Result} from "../core/logic/Result";

import fetch=require('node-fetch');

import IPlanningDTO from "../dto/IPlanningDTO";
import {PlanningLicensePlate} from "../domain/Planning/planningLicensePlate";
import {PlanningDate} from "../domain/Planning/planningDate";
import {PlanningWarehouse} from "../domain/Planning/planningWarehouse";
import {PlanningDelivery} from "../domain/Planning/planningDelivery";
import {Planning} from "../domain/Planning/planning";
import {PlanningId} from "../domain/Planning/planningId";
import IPlanningService from "./IServices/IPlanningService";
import IPlanningRepo from "../repos/IRepos/IPlanningRepo";
import {PlanningMap} from "../mappers/PlanningMap";

@Service()
export default class PlanningService implements IPlanningService {
	constructor(@Inject(config.repos.planning.name) private planningRepo: IPlanningRepo) {
	}

	public async createPlanning(planningDTO: IPlanningDTO): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>> {
		try {
			const url = "http://vs576.dei.isep.ipp.pt:2226/planning?";
			const path = url.concat("ls=" + planningDTO.licensePlate + "&date=" + planningDTO.date + "?heuristica=1");

			console.log(1)
			const response = await fetch(path);
			console.log(2)
			console.log(response)
			const date = await response.json();

			const planningOrError = await Planning.create({
				planningId: PlanningId.create(planningDTO.planningId).getValue(),
				licensePlate: PlanningLicensePlate.create(planningDTO.licensePlate).getValue(),
				date: PlanningDate.create(planningDTO.date).getValue(),
				warehouse: PlanningWarehouse.create(planningDTO.warehouse).getValue(),
				delivery: PlanningDelivery.create(planningDTO.delivery).getValue()
			});

			if (planningOrError.isFailure) {
				return Result.fail<{ planningDTO: IPlanningDTO, token: string }>(planningOrError.errorValue());
			}

			const planningResult = planningOrError.getValue();

			await this.planningRepo.save(planningResult);
			const planningDTOResult = PlanningMap.toDTO(planningResult) as IPlanningDTO;
			return Result.ok<{ planningDTO: IPlanningDTO, token: string }>({
				planningDTO: planningDTOResult,
				token: "Truck created successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async getPlanning(query?: any): Promise<Result<IPlanningDTO[]>> {
		return null;
	}

	public async updatePlanning(planningDTO: IPlanningDTO): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>> {
		return null;
	}

	public async deletePlanning(id: string): Promise<Result<{ planningDTO: IPlanningDTO, token: string }>> {
		return null;
	}
}
