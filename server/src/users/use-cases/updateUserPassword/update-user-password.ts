import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import zxcvbn from 'zxcvbn';

import { UpdateUserPasswordDTO } from '@users/dto';
import { IUsersRepository } from '@users/interfaces';

@Injectable()
export class UpdateUserPassword {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
    new_password,
    confirm_new_password,
  }: UpdateUserPasswordDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new BadRequestException('Usuário não existe!');

    const arePasswordsEqual = await compare(password, user.password);

    if (!arePasswordsEqual)
      throw new BadRequestException('Senha atual inválida!');

    const isSameAsCurrentPassword = await compare(new_password, user.password);

    if (isSameAsCurrentPassword)
      throw new BadRequestException('Incapaz de alterar a senha atual!');

    if (confirm_new_password !== new_password)
      throw new BadRequestException(
        'A confirmação da nova senha deve ser a mesma da nova senha!',
      );

    const passwordStrength = zxcvbn(new_password);
    const passwordScore = passwordStrength.score;
    const PASSWORD_STRENGTH_THRESHOLD = 3;

    if (passwordScore < PASSWORD_STRENGTH_THRESHOLD)
      throw new BadRequestException('Senha muito fraca!');

    const hashedPassword = await hash(new_password, 8);

    return this.usersRepository.updateUserPassword({
      email,
      new_password: hashedPassword,
    });
  }
}
