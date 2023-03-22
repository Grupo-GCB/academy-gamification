import { UpdateBusinessUnitDTO } from '@users/dto';
import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';

export abstract class IUsersRepository {
  abstract create(data: RegisterUserDTO): Promise<User>;

  abstract findOne(id: string): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract updateBusinessUnit({
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User>;

  abstract delete(id: string): Promise<void>;
}
