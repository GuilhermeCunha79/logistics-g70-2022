import { IUserPersistence } from "../dataschema/IUserPersistence";
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true
		},
		email: {
			type: String,
			required: [true, "Insert user email."],
			index: true
		},
		password: {
			type: String,
			required: [true, "Insert user password."],
			index: true
		},
		firstName: {
			type: String,
			required: [true, "Insert user first name."],
			index: true
		},
		lastName: {
			type: String,
			required: [true, "Insert user last name."],
			index: true
		},
		phoneNumber: {
			type: String,
			required: [true, "Insert user phoneNumber."],
			index: true
		},
		role: {
			type: Number,
			required: [true, "Insert user role."],
			index: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', UserSchema);
