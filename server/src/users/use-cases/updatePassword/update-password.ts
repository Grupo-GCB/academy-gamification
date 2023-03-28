import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import zxcvbn from 'zxcvbn';

import { UpdatePasswordDTO } from '@users/dto';
import { IUsersRepository } from '@users/interfaces';

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
    const user = await this.usersRepository.findById(id);

    if (!user) throw new BadRequestException('Usuário não existe!');

    const arePasswordsEqual = await compare(password, user.password);

    if (!arePasswordsEqual)
      throw new BadRequestException('Senha atual inválida!');

    const isEqualCurrentPassword = await compare(new_password, user.password);

    if (isEqualCurrentPassword === true)
      throw new BadRequestException('Incapaz de alterar a senha atual!');

    if (confirm_new_password !== new_password)
      throw new BadRequestException(
        'A confirmação da nova senha deve ser a mesma da nova senha!',
      );

    const passwordStrength = zxcvbn(new_password);
    const passwordRank = passwordStrength.score;
    const PASSWORD_MIN_STRENGTH = 3;

    if (passwordRank < PASSWORD_MIN_STRENGTH)
      throw new BadRequestException('Senha muito fraca!');

    const hashedPassword = await hash(new_password, 8);

    return this.usersRepository.updatePassword({
      id,
      new_password: hashedPassword,
    });
  }
}
