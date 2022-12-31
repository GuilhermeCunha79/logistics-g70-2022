import {ValueObject} from '../../core/domain/ValueObject';
import {Result} from '../../core/logic/Result';
import {Guard} from "../../core/logic/Guard";

interface INameProps {
	value: string;
}

export class UserName extends ValueObject<INameProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(name: string): Result<UserName> {
		const guardResult = Guard.againstNullOrUndefined(name, 'name');

		if (!guardResult.succeeded) {
			return Result.fail<UserName>(guardResult.message);
		} else {
			return Result.ok<UserName>(new UserName({value: name}))
		}
	}
}
