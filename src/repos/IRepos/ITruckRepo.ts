import {Repo} from "../../core/infra/Repo";
import {Truck} from "../../domain/Truck/truck";
import {TruckLicensePlate} from "../../domain/Truck/truckLicensePlate";

export default interface ITruckRepo extends Repo<Truck> {
	save(truck: Truck): Promise<Truck>;

	findByDomainId(licensePlate: TruckLicensePlate | string): Promise<Truck>;

	findByDomainIdd(licensePlate: TruckLicensePlate | string): Promise<Truck>;

	findAll(): Promise<Truck[]>

	delete(licensePlate: string): Promise<Truck>;
}
