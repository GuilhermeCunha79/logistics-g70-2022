import {Inject, Service} from 'typedi';
import config from "../../config";
import ITruckDTO from "../dto/ITruckDTO";
import {Truck} from "../domain/Truck/truck";
import ITruckRepo from '../repos/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import {Result} from "../core/logic/Result";
import {TruckMap} from "../mappers/truckMap";
import {TruckAutonomy} from "../domain/Truck/truckAutonomy";
import {TruckCapacityCargo} from "../domain/Truck/truckCapacityCargo";
import {TruckCapacityTransportation} from "../domain/Truck/truckCapacityTransportation";
import {TruckTare} from "../domain/Truck/truckTare";
import {TruckBattery} from "../domain/Truck/truckBattery";
import {TruckLicensePlate} from "../domain/Truck/truckLicensePlate";
import truckRoute from "../api/routes/truckRoute";

@Service()
export default class TruckService implements ITruckService {
	constructor(@Inject(config.repos.truck.name) private truckRepo: ITruckRepo) {
	}

	public async createTruck(truckDTO: ITruckDTO): Promise<Result<{ truckDTO: ITruckDTO, token: string }>> {
		try {

			const truckDocument = await this.truckRepo.findByDomainId(truckDTO.licensePlate);
			if (truckDocument != null) {
				return Result.fail<{ truckDTO: ITruckDTO, token: string }>("Truck already exists with licensePlate=" + truckDTO.licensePlate);
			}
			const truckOrError = await Truck.create({
				licensePlate: TruckLicensePlate.create(truckDTO.licensePlate).getValue(),
				autonomy: TruckAutonomy.create(truckDTO.autonomy).getValue(),
				capacityCargo: TruckCapacityCargo.create(truckDTO.capacityCargo).getValue(),
				capacityTransportation: TruckCapacityTransportation.create(truckDTO.capacityTransportation).getValue(),
				tare: TruckTare.create(truckDTO.tare).getValue(),
				battery: TruckBattery.create(truckDTO.battery).getValue(),
				status: true
			});


			if (truckOrError.isFailure) {
				return Result.fail<{ truckDTO: ITruckDTO, token: string }>(truckOrError.errorValue());
			}

			const truckResult = truckOrError.getValue();

			await this.truckRepo.save(truckResult);
			const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
			return Result.ok<{ truckDTO: ITruckDTO, token: string }>({
				truckDTO: truckDTOResult,
				token: "Truck created successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async getTruckById(licensePlate: string): Promise<Result<ITruckDTO>> {
		try {
			const truck = await this.truckRepo.findByDomainId(licensePlate);

			if (truck === null) {
				return Result.fail<ITruckDTO>("Truck not found.");
			} else {
				const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
				return Result.ok<ITruckDTO>(truckDTOResult)
			}
		} catch (e) {
			throw e;
		}
	}

	public async getAllTrucks(): Promise<Result<ITruckDTO[]>> {
		try {
			const truckList = await this.truckRepo.findAll();

			if (truckList == null) {
				return Result.fail<ITruckDTO[]>("There are no registered trucks.");
			}

			const result = truckList.map((truckList) => TruckMap.toDTO(truckList) as ITruckDTO);
			return Result.ok<ITruckDTO[]>(result);
		} catch (e) {
			throw e;
		}
	}

	public async updateTruck(truckDTO: ITruckDTO): Promise<Result<{ truckDTO: ITruckDTO, token: string }>> {
		try {
			const truck = await this.truckRepo.findByDomainId(truckDTO.licensePlate);

			if (truck === null) {
				return Result.fail<{ truckDTO: ITruckDTO, token: string }>("Truck not found with licensePlate=" + truckDTO.licensePlate);
			} else {
				if (truckDTO.autonomy) truck.autonomy = TruckAutonomy.create(truckDTO.autonomy).getValue();
				if (truckDTO.capacityCargo) truck.capacityCargo = TruckCapacityCargo.create(truckDTO.capacityCargo).getValue();
				if (truckDTO.capacityTransportation) truck.capacityTransportation = TruckCapacityTransportation.create(truckDTO.capacityTransportation).getValue();
				if (truckDTO.battery) truck.battery = TruckBattery.create(truckDTO.battery).getValue();
				if (truckDTO.tare) truck.tare = TruckTare.create(truckDTO.tare).getValue();

				await this.truckRepo.save(truck);
				const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
				return Result.ok<{ truckDTO: ITruckDTO, token: string }>({
					truckDTO: truckDTOResult,
					token: "Truck updated successfully."
				});
			}
		} catch (e) {
			throw e;
		}
	}

	public async deleteTruckById(licensePlate: string): Promise<Result<{ truckDTO: ITruckDTO, token: string }>> {
		try {
			const truck = await this.truckRepo.findByDomainId(licensePlate);

			if (truck === null) {
				return Result.fail<{ truckDTO: ITruckDTO, token: string }>("Truck not found.");
			}

			await this.truckRepo.delete(truck.licensePlate.value);
			return Result.ok<{ truckDTO: ITruckDTO, token: string }>({
				truckDTO: TruckMap.toDTO(truck),
				token: "Truck deleted successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async changeStatus(licensePlate: string): Promise<Result<{ truckDTO: ITruckDTO, token: string }>> {
		try {

			const truck = await this.truckRepo.findByDomainIdd(licensePlate);

			if (truck === null) {
				return Result.fail<{ truckDTO: ITruckDTO, token: string }>("Truck not found.");
			} else {

				truck.changeStatus();

				const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;


				return Result.ok<{ truckDTO: ITruckDTO, token: string }>({
					truckDTO: truckDTOResult,
					token: "Truck updated successfully."
				});
			}
		} catch (e) {
			throw e;
		}

	}

	public async softDelete(licensePlate: string): Promise<Result<{ truckDTO: ITruckDTO, token: string }>>{
		try{

			const truckDocument = await this.truckRepo.findByDomainId(licensePlate);
			console.log(truckDocument);
			if (truckDocument == null) {
				return Result.fail<{ truckDTO: ITruckDTO, token: string }>("Truck doesn't exists with licensePlate=" + licensePlate);
			}

			//console.log(truckDocument.status);
			truckDocument.status= !truckDocument.status;


			await this.truckRepo.save(truckDocument);

			const truckDTOResult = TruckMap.toDTO(truckDocument) as ITruckDTO;
			return Result.ok<{ truckDTO: ITruckDTO, token: string }>({
				truckDTO: truckDTOResult,
				token: "Truck status updated successfully."
			});
		} catch (e) {
			throw e;
		}

	}


}
