import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface IRoleProps {
	value: number;
}

export class UserRole extends ValueObject<IRoleProps> {

	get value(): number {
		return this.props.value;
	}

	public static create(role: number): Result<UserRole> {

		const guardResult = Guard.againstNullOrUndefined(role, "userRole");

		if (!guardResult.succeeded) {
			return Result.fail<UserRole>(guardResult.message);
		} else if (role >= 1 && role <= 5) {
			return Result.ok<UserRole>(new UserRole({ value: role }));
		} else {
			return Result.fail<UserRole>("Role code is invalid.");
		}
	}
}
