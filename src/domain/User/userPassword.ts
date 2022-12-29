import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IPasswordProps {
	value: string;
}

export class UserPassword extends ValueObject<IPasswordProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(password: string): Result<UserPassword> {
		const guardResult = Guard.againstNullOrUndefined(password, 'userPassword');

		if (!guardResult.succeeded) {
			return Result.fail<UserPassword>(guardResult.message);
		} else {
			return Result.ok<UserPassword>(new UserPassword({value: password}))
		}
	}
}
