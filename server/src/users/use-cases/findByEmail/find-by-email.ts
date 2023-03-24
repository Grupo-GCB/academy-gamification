import { NotFoundException } from '@nestjs/common';
import { FindByEmailDTO } from '@users/dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces';

export class FindByEmail {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email }: FindByEmailDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
