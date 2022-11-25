import {Inject, Service} from "typedi";
import config from "../../config";
import {Result} from "../core/logic/Result";
import IRouteService from "./IServices/IRouteService";
import IRouteDTO from "../dto/IRouteDTO";
import {Route} from "../domain/Route/route";
import {RouteExtraTimeBattery} from "../domain/Route/routeExtraTimeBattery";
import {RouteEnergySpent} from "../domain/Route/routeEnergySpent";
import {RouteDistance} from "../domain/Route/routeDistance";
import {RouteDestination} from "../domain/Route/routeDestination";
import {RouteOrigin} from "../domain/Route/routeOrigin";
import {RouteId} from "../domain/Route/routeId";
import {RouteTimeDistance} from "../domain/Route/routeTimeDistance";
import IRouteRepo from "../repos/IRepos/IRouteRepo";
import {RouteMap} from "../mappers/routeMap";

@Service()
export default class RouteService implements IRouteService {
	constructor(@Inject(config.repos.route.name) private routeRepo: IRouteRepo) {
	}

	public async createRoute(routeDTO: IRouteDTO): Promise<Result<{ routeDTO: IRouteDTO, token: string }>> {
		try {
			const routeDocument = await this.routeRepo.findByDomainId(routeDTO.routeId);

			if (routeDocument != null) {
				return Result.fail<{ routeDTO: IRouteDTO, token: string }>("Route already exists with id=" + routeDTO.routeId);
			}

			const routeOrError = await Route.create({
				routeId: RouteId.create(routeDTO.routeId).getValue(),
				origin: RouteOrigin.create(routeDTO.origin).getValue(),
				destination: RouteDestination.create(routeDTO.destination).getValue(),
				distance: RouteDistance.create(routeDTO.distance).getValue(),
				timeDistance: RouteTimeDistance.create(routeDTO.timeDistance).getValue(),
				energySpent: RouteEnergySpent.create(routeDTO.energySpent).getValue(),
				extraTimeBattery: RouteExtraTimeBattery.create(routeDTO.extraTimeBattery).getValue()
			});

			if (routeOrError.isFailure) {
				return Result.fail<{ routeDTO: IRouteDTO, token: string }>(routeOrError.errorValue());
			}

			const routeResult = routeOrError.getValue();

			await this.routeRepo.save(routeResult);
			const routeDTOResult = RouteMap.toDTO(routeResult) as IRouteDTO;
			return Result.ok<{ routeDTO: IRouteDTO, token: string }>({
				routeDTO: routeDTOResult,
				token: "Route created successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async getRouteById(id: string): Promise<Result<IRouteDTO>> {
		try {
			const route = await this.routeRepo.findByDomainId(id);

			if (route == null) {
				return Result.fail<IRouteDTO>("Route not found.");
			} else {
				const routeDTOResult = RouteMap.toDTO(route) as IRouteDTO;
				return Result.ok<IRouteDTO>(routeDTOResult)
			}
		} catch (e) {
			throw e;
		}
	}

	public async getRouteByOriginAndDestination(origin: string, destination: string): Promise<Result<IRouteDTO>> {
		try {
			const route = await this.routeRepo.findByOriginAndDestination(origin, destination);

			if (route == null) {
				return Result.fail<IRouteDTO>("Route not found with those parameters.");
			} else {
				const routeDTOResult = RouteMap.toDTO(route) as IRouteDTO;
				return Result.ok<IRouteDTO>(routeDTOResult)
			}
		} catch (e) {
			throw e;
		}
	}

	public async getRouteByOriginOrDestination(location: string, origin: boolean): Promise<Result<IRouteDTO[]>> {
		try {
			const routeList = await this.routeRepo.findByOriginOrDestination(location, origin);

			if (routeList == null) {
				return Result.fail<IRouteDTO[]>("There are no registered routes with that parameters.");
			}

			const result = routeList.map((routeList) => RouteMap.toDTO(routeList) as IRouteDTO);
			return Result.ok<IRouteDTO[]>(result);
		} catch (e) {
			throw e;
		}
	}

	public async getAllRoutes(): Promise<Result<IRouteDTO[]>> {
		try {
			const routeList = await this.routeRepo.findAll();

			if (routeList == null) {
				return Result.fail<IRouteDTO[]>("There are no registered routes.");
			}

			const result = routeList.map((routeList) => RouteMap.toDTO(routeList) as IRouteDTO);
			return Result.ok<IRouteDTO[]>(result);
		} catch (e) {
			throw e;
		}
	}

	public async updateRoute(routeDTO: IRouteDTO): Promise<Result<{ routeDTO: IRouteDTO, token: string }>> {
		try {
			if (routeDTO.origin == routeDTO.destination) {
				return Result.fail<{ routeDTO: IRouteDTO, token: string }>("Origin and Destination can't be the same.");
			}

			const route = await this.routeRepo.findByOriginAndDestination(routeDTO.origin, routeDTO.destination);

			if (route == null) {
				return Result.fail<{ routeDTO: IRouteDTO, token: string }>("Route not found with origin=" + routeDTO.origin + " | destination=" + routeDTO.destination);
			} else {
				route.origin = RouteOrigin.create(routeDTO.origin).getValue();
				route.destination = RouteDestination.create(routeDTO.destination).getValue();
				route.distance = RouteDistance.create(routeDTO.distance).getValue();
				route.timeDistance = RouteTimeDistance.create(routeDTO.timeDistance).getValue();
				route.energySpent = RouteEnergySpent.create(routeDTO.energySpent).getValue();
				route.extraTimeBattery = RouteExtraTimeBattery.create(routeDTO.extraTimeBattery).getValue();

				await this.routeRepo.save(route);
				const routeDTOResult = RouteMap.toDTO(route) as IRouteDTO;
				return Result.ok<{ routeDTO: IRouteDTO, token: string }>({
					routeDTO: routeDTOResult,
					token: "Route updated successfully."
				});
			}
		} catch (e) {
			throw e;
		}
	}

	public async deleteRouteById(routeId: string): Promise<Result<{ routeDTO: IRouteDTO, token: string }>> {
		try {
			const route = await this.routeRepo.findByDomainId(routeId);

			if (route == null) {
				return Result.fail<{ routeDTO: IRouteDTO, token: string }>("Route not found.");
			}

			await this.routeRepo.delete(route.routeId.value);
			return Result.ok<{ routeDTO: IRouteDTO, token: string }>({
				routeDTO: RouteMap.toDTO(route),
				token: "Route deleted successfully."
			});
		} catch (e) {
			throw e;
		}
	}
}
