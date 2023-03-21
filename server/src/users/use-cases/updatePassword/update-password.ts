import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import zxcvbn from 'zxcvbn';

import { UpdatePasswordDTO } from '@users/dto/update-password.dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

Injectable();
export class UpdatePassword {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    password,
    new_password,
  }: UpdatePasswordDTO): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (password !== user.password) {
      throw new BadRequestException('Incorrect current password');
    }

    const passwordStrength = zxcvbn(new_password);
    const passwordRank = passwordStrength.score;

    if (passwordRank < 3) throw new BadRequestException('Too weak password');

    new_password = await hash(new_password, 8);

    return this.usersRepository.updatePassword({
      id,
      new_password,
    });
  }
}
