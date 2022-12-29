import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface IEmailProps {
	value: string;
}

export class UserEmail extends ValueObject<IEmailProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(email: string): Result<UserEmail> {
		const guardResult = Guard.againstNullOrUndefined(email, 'userEmail');

		if (!guardResult.succeeded) {
			return Result.fail<UserEmail>(guardResult.message);
		} else {
			return Result.ok<UserEmail>(new UserEmail({value: email}))
		}
	}
}
