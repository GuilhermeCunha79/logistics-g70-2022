import {IRoutePersistence} from '../../dataschema/IRoutePersistence';
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
	{
		domainId: {type: String, unique: true},
		name: {type: String, unique: true}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IRoutePersistence & mongoose.Document>('Role', RoleSchema);


