import { UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IRegisterUser } from './IRegisterUser';
import { IUpdatePassword } from './IUpdatePassword';

export abstract class IUsersRepository {
  abstract create(data: IRegisterUser): Promise<User>;

  abstract findById(id: string): Promise<User>;

  abstract findByEmail(email: string): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract updateBusinessUnit({
    email,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User>;

  abstract delete(id: string): Promise<void>;

  abstract updatePassword({
    email,
    new_password,
  }: IUpdatePassword): Promise<void>;
}
