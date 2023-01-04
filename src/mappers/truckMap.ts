import {Mapper} from "../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {Truck} from "../domain/Truck/truck";
import ITruckDTO from "../dto/ITruckDTO";
import {TruckLicensePlate} from "../domain/Truck/truckLicensePlate";
import {TruckCapacityCargo} from "../domain/Truck/truckCapacityCargo";
import {TruckCapacityTransportation} from "../domain/Truck/truckCapacityTransportation";
import {TruckAutonomy} from "../domain/Truck/truckAutonomy";
import {TruckBattery} from "../domain/Truck/truckBattery";
import {TruckTare} from "../domain/Truck/truckTare";
import {ITruckPersistence} from "../dataschema/ITruckPersistence";

export class TruckMap extends Mapper<Truck> {

	public static toDTO(truck: Truck): ITruckDTO {
		return {
			licensePlate: truck.licensePlate.value,
			autonomy: truck.autonomy.value,
			capacityCargo: truck.capacityCargo.value,
			capacityTransportation: truck.capacityTransportation.value,
			battery: truck.battery.value,
			tare: truck.tare.value,
			status: truck.status
		} as ITruckDTO;
	}

	public static toDomain(raw: any | Model<ITruckPersistence & Document>): Truck {
		const truckOrError = Truck.create({
				licensePlate: TruckLicensePlate.create(raw.licensePlate).getValue(),
				capacityCargo: TruckCapacityCargo.create(raw.capacityCargo).getValue(),
				capacityTransportation: TruckCapacityTransportation.create(raw.capacityTransportation).getValue(),
				autonomy: TruckAutonomy.create(raw.autonomy).getValue(),
				battery: TruckBattery.create(raw.battery).getValue(),
				tare: TruckTare.create(raw.tare).getValue(),
				status: raw.status
			}, new UniqueEntityID(raw.domainId)
		);

		truckOrError.isFailure ? console.log(truckOrError.error) : '';
		return truckOrError.isSuccess ? truckOrError.getValue() : null;
	}

	public static toPersistence(truck: Truck): any {
		return {
			domainId: truck.id.toString(),
			licensePlate: truck.licensePlate.value,
			autonomy: truck.autonomy.value,
			capacityCargo: truck.capacityCargo.value,
			capacityTransportation: truck.capacityTransportation.value,
			battery: truck.battery.value,
			tare: truck.tare.value,
			status: truck.status
		};
	}
}
