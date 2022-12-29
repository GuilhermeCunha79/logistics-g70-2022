import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IPhoneNumberProps {
	value: string;
}

export class UserPhoneNumber extends ValueObject<IPhoneNumberProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(phoneNumber: string): Result<UserPhoneNumber> {
		const guardResult = Guard.againstNullOrUndefined(phoneNumber, 'userPhoneNumber');

		if (!guardResult.succeeded) {
			return Result.fail<UserPhoneNumber>(guardResult.message);
		} else {
			return Result.ok<UserPhoneNumber>(new UserPhoneNumber({value: phoneNumber}))
		}
	}
}
