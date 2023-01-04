import {Inject, Service} from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import {Truck} from "../domain/Truck/truck";
import {TruckMap} from "../mappers/truckMap";
import {TruckLicensePlate} from "../domain/Truck/truckLicensePlate";
import ITruckRepo from "./IRepos/ITruckRepo";
import {ITruckPersistence} from "../dataschema/ITruckPersistence";

@Service()
export default class TruckRepo implements ITruckRepo {

	constructor(@Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>,) {
	}

	exists(t: Truck): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	public async save(truck: Truck): Promise<Truck> {
		const query = {licensePlate: truck.licensePlate.value};
		const truckDocument = await this.truckSchema.findOne(query);

		try {
			if (truckDocument === null) {
				const rawTruck: any = TruckMap.toPersistence(truck);
				const truckCreated = await this.truckSchema.create(rawTruck);
				return TruckMap.toDomain(truckCreated);
			} else {
				truckDocument.autonomy = truck.autonomy.value;
				truckDocument.capacityCargo = truck.capacityCargo.value;
				truckDocument.capacityTransportation = truck.capacityTransportation.value;
				truckDocument.battery = truck.battery.value;
				truckDocument.tare = truck.tare.value;
				truckDocument.status= truck.status;

				await truckDocument.save();
				return truck;
			}
		} catch (err) {
			throw err;
		}
	}

	public async findByDomainId(licensePlates: TruckLicensePlate | string): Promise<Truck> {
		const query = {licensePlate: licensePlates};
		const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

		if (truckRecord != null) {
			return TruckMap.toDomain(truckRecord);
		}
		return null;
	}


	public async findByDomainIdd(licensePlates: TruckLicensePlate | string): Promise<Truck> {
		const query = {licensePlate: licensePlates};
		const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

		if (truckRecord != null) {
			return TruckMap.toDomain(truckRecord);
		}
		return null;
	}

	public async findAll(): Promise<Truck[]> {
		const truckRecord = await this.truckSchema.find();

		if (truckRecord != null) {
			return (truckRecord.map((postRecord) => TruckMap.toDomain(postRecord)));
		}
		return null;
	}

	public async delete(licensePlate: string): Promise<Truck> {
		const query = {licensePlate: licensePlate};
		const truckDocument = await this.truckSchema.findOne(query);

		if (truckDocument != null) {
			truckDocument.remove();
			return TruckMap.toDomain(truckDocument);
		}
		return null;
	}
}
