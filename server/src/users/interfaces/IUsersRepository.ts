import { RegisterUserDTO, UpdateBusinessUnitDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUpdatePassword } from './IUpdatePassword';

export abstract class IUsersRepository {
  abstract create(data: RegisterUserDTO): Promise<User>;

  abstract findOne(id: string): Promise<User>;

  abstract updateBusinessUnit({
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User>;

  abstract delete(id: string): Promise<void>;

  abstract updatePassword({ id, new_password }: IUpdatePassword): Promise<User>;
}
