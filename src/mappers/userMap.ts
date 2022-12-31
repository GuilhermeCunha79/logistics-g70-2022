import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { User } from "../domain/User/user";
import IUserDTO from "../dto/IUserDTO";
import { IUserPersistence } from "../dataschema/IUserPersistence";
import { UserEmail } from "../domain/User/userEmail";
import { UserPassword } from "../domain/User/userPassword";
import { UserPhoneNumber } from "../domain/User/userPhoneNumber";
import { UserRole } from "../domain/User/userRole";
import { UserName } from "../domain/User/userName";

export class UserMap extends Mapper<User> {

	public static toDTO(user: User): IUserDTO {
		return {
			email: user.email.value,
			password: user.password.value,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			phoneNumber: user.phoneNumber.value,
			role: user.role.value
		} as IUserDTO;
	}

	public static toDomain(raw: any | Model<IUserPersistence & Document>): User {
		const userOrError = User.create({
			email: UserEmail.create(raw.email).getValue(),
			password: UserPassword.create(raw.password).getValue(),
			firstName: UserName.create(raw.firstName).getValue(),
			lastName: UserName.create(raw.lastName).getValue(),
			phoneNumber: UserPhoneNumber.create(raw.phoneNumber).getValue(),
			role: UserRole.create(raw.role).getValue()
			}, new UniqueEntityID(raw.domainId)
		);

		userOrError.isFailure ? console.log(userOrError.error) : "";
		return userOrError.isSuccess ? userOrError.getValue() : null;
	}

	public static toPersistence(user: User): any {
		return {
			domainId: user.id.toString(),
			email: user.email.value,
			password: user.password.value,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			phoneNumber: user.phoneNumber.value,
			role: user.role.value
		};
	}
}
