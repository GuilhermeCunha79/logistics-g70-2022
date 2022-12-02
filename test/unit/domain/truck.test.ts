import {expect} from "chai";
import {Truck} from "../../../src/domain/Truck/truck";
import {TruckLicensePlate} from "../../../src/domain/Truck/truckLicensePlate";
import {TruckAutonomy} from "../../../src/domain/Truck/truckAutonomy";
import {TruckCapacityCargo} from "../../../src/domain/Truck/truckCapacityCargo";
import {TruckCapacityTransportation} from "../../../src/domain/Truck/truckCapacityTransportation";
import {TruckTare} from "../../../src/domain/Truck/truckTare";
import {TruckBattery} from "../../../src/domain/Truck/truckBattery";

describe('Truck Unit Tests', () => {
	let licensePlate= "AA-00-AA";
	let autonomy = 100;
	let capacityCargo=4300;
	let capacityTransportation=120;
	let battery=80;
	let tare=7500;

	const truckInvalidAutonomy = -100;
	const truckInvalidCapacityCargo=-4300;
	const truckInvalidCapacityTransportation=-120;
	const truckInvalidBattery=-80;
	const truckInvalidTare=-3000;

	const truck = Truck.create({
		licensePlate: TruckLicensePlate.create(licensePlate).getValue(),
		autonomy: TruckAutonomy.create(autonomy).getValue(),
		capacityCargo: TruckCapacityCargo.create(capacityCargo).getValue(),
		capacityTransportation: TruckCapacityTransportation.create(capacityTransportation).getValue(),
		tare: TruckTare.create(tare).getValue(),
		battery: TruckBattery.create(battery).getValue(),
	});

	it('create valid tare', () => {
		expect(truck.getValue().tare.value).to.equal(tare);
	})

	it('create invalid tare', () => {
		const invalidTare = TruckTare.create(truckInvalidTare);
		expect(true).to.equal(invalidTare.isFailure);
	})

	it('create valid capacityCargo', () => {
		expect(truck.getValue().capacityCargo.value).to.equal(capacityCargo);
	})

	it('create invalid capacityCargo', () => {
		const invalidCapacityCargo = TruckTare.create(truckInvalidCapacityCargo);
		expect(true).to.equal(invalidCapacityCargo.isFailure);
	})

	it('create valid capacityTransportation', () => {
		expect(truck.getValue().capacityTransportation.value).to.equal(capacityTransportation);
	})

	it('create invalid capacityTransportation', () => {
		const invalidCapacityTransportation = TruckTare.create(truckInvalidCapacityTransportation);
		expect(true).to.equal(invalidCapacityTransportation.isFailure);
	})

	it('create valid truckBattery ', () => {
		expect(truck.getValue().battery.value).to.equal(battery);
	})

	it('create invalid truckBattery', () => {
		const invalidBattery = TruckTare.create(truckInvalidBattery);
		expect(true).to.equal(invalidBattery.isFailure);
	})

	it('create valid truck Autonomy ', () => {
		expect(truck.getValue().autonomy.value).to.equal(autonomy);
	})

	it('create invalid truckBattery', () => {
		const invalidAutonomy = TruckTare.create(truckInvalidAutonomy);
		expect(true).to.equal(invalidAutonomy.isFailure);
	})
})
