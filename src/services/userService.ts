import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IUserService from "./IServices/IUserService";
import IUserDTO from "../dto/IUserDTO";
import { User } from "../domain/User/user";
import IUserRepo from "../repos/IRepos/IUserRepo";
import { UserMap } from "../mappers/userMap";
import { UserEmail } from "../domain/User/userEmail";
import { UserPassword } from "../domain/User/userPassword";
import { UserPhoneNumber } from "../domain/User/userPhoneNumber";
import { UserRole } from "../domain/User/userRole";

@Service()
export default class UserService implements IUserService {
	constructor(@Inject(config.repos.user.name) private userRepo: IUserRepo) {
	}

	public async createUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			let userDocument = (await this.userRepo.find({ email: userDTO.email }))[0];

			if (userDocument != null) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User already exists with email=" + userDTO.email);
			}

			const userOrError = await User.create({
				email: UserEmail.create(userDTO.email).getValue(),
				password: UserPassword.create(userDTO.password).getValue(),
				phoneNumber: UserPhoneNumber.create(userDTO.phoneNumber).getValue(),
				role: UserRole.create(userDTO.role).getValue()
			});

			if (userOrError.isFailure) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>(userOrError.errorValue());
			}

			const userResult = userOrError.getValue();

			await this.userRepo.save(userResult);
			const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
			return Result.ok<{ userDTO: IUserDTO, token: string }>({
				userDTO: userDTOResult,
				token: "User created successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async getUser(query?: any): Promise<Result<IUserDTO[]>> {
		try {
			const userList = await this.userRepo.find(query);

			if (userList.length == 0) {
				return Result.fail<IUserDTO[]>("Users not found.");
			}

			const result = userList.map((userList) => UserMap.toDTO(userList) as IUserDTO);
			return Result.ok<IUserDTO[]>(result);
		} catch (e) {
			throw e;
		}
	}

	public async updateUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		return null;
	}

	public async deleteUser(email: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			const user = await this.userRepo.findByEmail(email);

			if (user === null) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User not found.");
			}

			await this.userRepo.delete(user.email.value);
			return Result.ok<{ userDTO: IUserDTO, token: string }>({
				userDTO: UserMap.toDTO(user),
				token: "User deleted successfully."
			});
		} catch (e) {
			throw e;
		}
	}
}
