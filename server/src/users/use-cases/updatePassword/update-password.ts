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
    confirm_new_password,
  }: UpdatePasswordDTO): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new BadRequestException('User does not exist');

    if (password !== user.password)
      throw new BadRequestException('Incorrect current password');

    if (password === new_password)
      throw new BadRequestException(
        'Unable to change password to current password',
      );

    if (confirm_new_password !== new_password)
      throw new BadRequestException(
        'Confirm password must be same as new password',
      );

    const passwordStrength = zxcvbn(new_password);
    const passwordRank = passwordStrength.score;
    const PASSWORD_MIN_STRENGTH = 3;

    if (passwordRank < PASSWORD_MIN_STRENGTH)
      throw new BadRequestException('Too weak password');

    new_password = await hash(new_password, 8);

    return this.usersRepository.updatePassword({
      id,
      new_password,
    });
  }
}
