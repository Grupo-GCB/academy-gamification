import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import zxcvbn from 'zxcvbn';

import { UpdatePasswordDTO } from '@users/dto';
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
  }: UpdatePasswordDTO): Promise<void> {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new BadRequestException('User does not exist');

    const arePasswordsEqual = await compare(password, user.password);

    if (!arePasswordsEqual)
      throw new BadRequestException('Incorrect current password');

    const isEqualCurrentPassword = await compare(new_password, user.password);

    if (isEqualCurrentPassword === true)
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

    const hashedPassword = await hash(new_password, 8);

    return this.usersRepository.updatePassword({
      id,
      new_password: hashedPassword,
    });
  }
}
