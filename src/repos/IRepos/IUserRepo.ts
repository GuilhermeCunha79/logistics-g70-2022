import {Repo} from "../../core/infra/Repo";
import { User } from "../../domain/User/user";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;

	find(query?: any): Promise<User[]>;

	delete(email: string, password: string): Promise<User>;
}
