import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";
import { UserPhoneNumber } from "./userPhoneNumber";
import { UserRole } from "./userRole";
import { UserName } from "./userName";

interface UserProps {
	email: UserEmail;
	password: UserPassword;
	firstName: UserName;
	lastName: UserName;
	phoneNumber: UserPhoneNumber;
	role: UserRole;

}

export class User extends AggregateRoot<UserProps> {

	get id(): UniqueEntityID {
		return this._id;
	}

	get email(): UserEmail {
		return this.props.email;
	}

	get password(): UserPassword {
		return this.props.password;
	}

	get firstName(): UserName {
		return this.props.firstName;
	}

	get lastName(): UserName {
		return this.props.lastName;
	}

	get phoneNumber(): UserPhoneNumber {
		return this.props.phoneNumber;
	}

	get role(): UserRole {
		return this.props.role;
	}

	set firstName(value: UserName) {
		this.props.firstName = value;
	}

	set lastName(value: UserName) {
		this.props.lastName = value;
	}

	set password(value: UserPassword) {
		this.props.password = value;
	}

	set phoneNumber(value: UserPhoneNumber) {
		this.props.phoneNumber = value;
	}

	public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
		const guardedProps = [
			{ argument: props.email, argumentName: "userEmail" },
			{ argument: props.password, argumentName: "userPassword" },
			{ argument: props.firstName, argumentName: "name" },
			{ argument: props.lastName, argumentName: "name" },
			{ argument: props.phoneNumber, argumentName: "userPhoneNumber" },
			{ argument: props.role, argumentName: "userRole" },

		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<User>(guardResult.message);
		} else {
			return Result.ok<User>(new User({ ...props }, id));
		}
	}
}
