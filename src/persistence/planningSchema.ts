import {IPlanningPersistence} from '../dataschema/IPlanningPersistence';
import mongoose from 'mongoose';

const PlanningSchema = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true
		},
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
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', PlanningSchema);
