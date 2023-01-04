import {ITruckPersistence} from '../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true
		},
		licensePlate: {
			type: String,
			required: [true, "Insert truck's license plate."],
			index: true
		},
		autonomy: {
			type: Number,
			required: [true, "Insert truck's autonomy."],
			index: true
		},
		capacityCargo: {
			type: Number,
			required: [true, "Insert truck's capacity cargo."],
			index: true
		},
		capacityTransportation: {
			type: Number,
			required: [true, "Insert truck's capacity transportation."],
			index: true
		},
		battery: {
			type: Number,
			required: [true, "Insert truck's battery."],
			index: true
		},
		tare: {
			type: Number,
			required: [true, "Insert truck's tare."],
			index: true
		},
		status: {
			type: Boolean,
			index: true
		}
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
