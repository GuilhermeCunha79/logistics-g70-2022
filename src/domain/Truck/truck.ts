import {AggregateRoot} from '../../core/domain/AggregateRoot';
import {UniqueEntityID} from '../../core/domain/UniqueEntityID';
import {Result} from '../../core/logic/Result';
import {Guard} from '../../core/logic/Guard';

import {TruckAutonomy} from './truckAutonomy';
import {TruckCapacityCargo} from './truckCapacityCargo';
import {TruckCapacityTransportation} from './truckCapacityTransportation';
import {TruckBattery} from './truckBattery';
import {TruckTare} from './truckTare';
import {TruckLicensePlate} from "./truckLicensePlate";

interface TruckProps {
	licensePlate: TruckLicensePlate;
	autonomy: TruckAutonomy;
	capacityCargo: TruckCapacityCargo;
	capacityTransportation: TruckCapacityTransportation;
	battery: TruckBattery;
	tare: TruckTare;
	status: boolean;
}

export class Truck extends AggregateRoot<TruckProps> {
	get id(): UniqueEntityID {
		return this._id;
	}

	get licensePlate(): TruckLicensePlate {
		return this.props.licensePlate;
	}

	get autonomy(): TruckAutonomy {
		return this.props.autonomy;
	}

	get capacityCargo(): TruckCapacityCargo {
		return this.props.capacityCargo;
	}

	get capacityTransportation(): TruckCapacityTransportation {
		return this.props.capacityTransportation;
	}

	get battery(): TruckBattery {
		return this.props.battery;
	}

	get tare(): TruckTare {
		return this.props.tare;
	}

	get status(): boolean {
		return this.props.status;
	}

	set autonomy(value: TruckAutonomy) {
		this.props.autonomy = value;
	}

	set capacityCargo(value: TruckCapacityCargo) {
		this.props.capacityCargo = value;
	}

	set capacityTransportation(value: TruckCapacityTransportation) {
		this.props.capacityTransportation = value;
	}

	set battery(value: TruckBattery) {
		this.props.battery = value;
	}

	set tare(value: TruckTare) {
		this.props.tare = value;
	}

	set status(value: boolean){
		this.props.status= value;
	}


	public changeStatus() {
		this.props.status=!this.props.status;
	}

	private constructor(props: TruckProps, id?: UniqueEntityID) {
		super(props, id);
	}

	public static create(props: TruckProps, id?: UniqueEntityID): Result<Truck> {
		const guardedProps = [
			{argument: props.licensePlate, argumentName: 'licensePlate'},
			{argument: props.autonomy, argumentName: 'autonomy'},
			{argument: props.capacityCargo, argumentName: 'capacityCargo'},
			{argument: props.capacityTransportation, argumentName: 'capacityTransportation'},
			{argument: props.battery, argumentName: 'battery'},
			{argument: props.tare, argumentName: 'tare'},
			{argument: props.status, argumentName: 'status'},
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<Truck>(guardResult.message);
		} else {
			const truck = new Truck({...props}, id);
			return Result.ok<Truck>(truck);
		}
	}

}
