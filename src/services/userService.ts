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
import { UserName } from "../domain/User/userName";
import { UserPhoneNumber } from "../domain/User/userPhoneNumber";
import { UserRole } from "../domain/User/userRole";
import { randomBytes } from "crypto";
import argon2 from "argon2";


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

			const salt = randomBytes(32);
			const hashedPassword = await argon2.hash(userDTO.password, { salt });

			const userOrError = await User.create({
				email: UserEmail.create(userDTO.email).getValue(),
				password: UserPassword.create(hashedPassword).getValue(),
				firstName: UserName.create(userDTO.firstName).getValue(),
				lastName: UserName.create(userDTO.lastName).getValue(),
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

	public async getUser(query: any, password: string): Promise<Result<IUserDTO>> {
		try {
			const userList = await this.userRepo.find(query);

			if (userList.length == 0) {
				return Result.fail<IUserDTO>("Users not found.");
			}

			const validPassword = await argon2.verify(userList[0].password.value, password);

			if (!validPassword) {
				return Result.fail<IUserDTO>("Wrong password.");
			}

			const result = UserMap.toDTO(userList[0]) as IUserDTO;
			return Result.ok<IUserDTO>(result);
		} catch (e) {
			throw e;
		}
	}

	public async updateUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			const user = await this.userRepo.findByDomainId(userDTO.email);

			if (user === null) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User not found with licensePlate=" + userDTO.email);
			} else {
				if (userDTO.phoneNumber) user.phoneNumber = UserPhoneNumber.create("---------").getValue();
				if (userDTO.firstName) user.firstName = UserName.create("---------").getValue();
				if (userDTO.lastName) user.lastName = UserName.create("---------").getValue();
				if (userDTO.password) user.password = UserPassword.create("999999999").getValue();


				await this.userRepo.save(user);
				const userDTOResult = UserMap.toDTO(user) as IUserDTO;
				return Result.ok<{ userDTO: IUserDTO, token: string }>({
					userDTO: userDTOResult,
					token: "User updated successfully."
				});
			}
		} catch (e) {
			throw e;
		}
	}

	public async deleteUser(query: any, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			const userList = (await this.userRepo.find(query))[0];

			if (!userList) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User not found.");
			}

			const validPassword = await argon2.verify(userList.password.value, password);

			if (!validPassword) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("Password doesn't match.");
			}

			await this.userRepo.delete(query);
			return Result.ok<{ userDTO: IUserDTO, token: string }>({
				userDTO: UserMap.toDTO(userList),
				token: "User deleted successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	public async getAllUsers(): Promise<Result<IUserDTO[]>> {
		try {
			const userList= await this.userRepo.findAll();

			if (userList == null) {
				return Result.fail<IUserDTO[]>("There are no registered users.");
			}

			const result = userList.map((userList) => UserMap.toDTO(userList) as IUserDTO);
			return Result.ok<IUserDTO[]>(result);
		} catch (e) {
			throw e;
		}
	}
}
