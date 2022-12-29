import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";
import { UserPhoneNumber } from "./userPhoneNumber";
import { UserRole } from "./userRole";

interface UserProps {
	email: UserEmail;
	password: UserPassword;
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

	get phoneNumber(): UserPhoneNumber {
		return this.props.phoneNumber;
	}

	get role(): UserRole {
		return this.props.role;
	}

	public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
		const guardedProps = [
			{ argument: props.email, argumentName: "userEmail" },
			{ argument: props.password, argumentName: "userPassword" },
			{ argument: props.phoneNumber, argumentName: "userPhoneNumber" },
			{ argument: props.role, argumentName: "userRole" }
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<User>(guardResult.message);
		} else {
			return Result.ok<User>(new User({ ...props }, id));
		}
	}
}
