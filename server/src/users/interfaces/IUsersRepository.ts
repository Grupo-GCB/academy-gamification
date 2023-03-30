import { FilterUserByRoleDTO, UpdateUserBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IRegisterUser } from './IRegisterUser';
import { IUpdateUserPassword } from './IUpdateUserPassword';

export abstract class IUsersRepository {
  abstract create(data: IRegisterUser): Promise<User>;

  abstract findById(id: string): Promise<User>;

  abstract findByEmail(email: string): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract updateUserBusinessUnit({
    email,
    new_bu,
  }: UpdateUserBusinessUnitDTO): Promise<User>;

  abstract delete(id: string): Promise<void>;

  abstract updateUserPassword({
    email,
    new_password,
  }: IUpdateUserPassword): Promise<void>;

  abstract filterByRole({ role }: FilterUserByRoleDTO): Promise<User[]>;
}
