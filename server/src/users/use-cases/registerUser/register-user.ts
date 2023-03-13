import { Injectable } from '@nestjs/common';

import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class RegisterUser {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: RegisterUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);

    return user;
  }
}
