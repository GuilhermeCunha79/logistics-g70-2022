import {IPlanningPersistence} from '../dataschema/IPlanningPersistence';
import mongoose from 'mongoose';

const PlanningSchema = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true
		},
		// planningId: {
		// 	type: String,
		// 	required: [true, "Insert planning id."],
		// 	index: true
		// },
		licensePlate: {
			type: String,
			required: [true, "Insert planning license plate."],
			index: true
		},
		date: {
			type: String,
			required: [true, "Insert planning date."],
			index: true
		},
		warehouse: {
			type: String,
			required: [true, "Insert planning warehouse."],
			index: true
		}
		/*delivery: {
			type: String,
			required: [true, "Insert planning delivery."],
			index: true
		}*/ //TODO:???
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', PlanningSchema);
