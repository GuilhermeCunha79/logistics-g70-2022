import {Repo} from "../../core/infra/Repo";
import { User } from "../../domain/User/user";
import {UserEmail} from "../../domain/User/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findAll(): Promise<User[]>
	find(query?: any): Promise<User[]>;
	delete(query: any): Promise<User>;
	findByDomainId(email: UserEmail | string): Promise<User>;


}
