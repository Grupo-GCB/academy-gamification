import { UpdateBusinessUnitDTO } from '@users/dto';
import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';

export abstract class IUsersRepository {
  abstract create(data: RegisterUserDTO): Promise<User>;

  abstract findOne(id: string): Promise<User>;

  abstract updateBusinessUnit({
    id,
    new_bu,
  }: UpdateBusinessUnitDTO): Promise<User>;
}
