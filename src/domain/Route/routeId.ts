import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface IRouteIdProps {
	value: string;
}

export class RouteId extends ValueObject<IRouteIdProps> {

	get value(): string {
		return this.props.value;
	}

	public static create(id: string): Result<RouteId> {
		const guardResult = Guard.againstNullOrUndefined(id, 'id');

		if (!guardResult.succeeded) {
			return Result.fail<RouteId>(guardResult.message);
		} else {
			return Result.ok<RouteId>(new RouteId({value: id}));
		}
	}
}
