import {IRoutePersistence} from '../dataschema/IRoutePersistence';
import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true
		},
		routeId: {
			type: String,
			required: [true, "Insert route's id."],
			index: true
		},
		origin: {
			type: String,
			required: [true, "Insert route's origin."],
			index: true
		},
		destination: {
			type: String,
			required: [true, "Insert route's destination."],
			index: true
		},
		distance: {
			type: Number,
			required: [true, "Insert route's distance."],
			index: true
		},
		timeDistance: {
			type: Number,
			required: [true, "Insert route's time distance."],
			index: true
		},
		energySpent: {
			type: Number,
			required: [true, "Insert route's energy spent."],
			index: true
		},
		extraBatteryTime: {
			type: Number,
			required: [true, "Insert route's extra battery time."],
			index: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IRoutePersistence & mongoose.Document>('Route', RouteSchema);
