import { NotFoundException } from '@nestjs/common';
import { FindByEmailDTO } from '@users/dto/find-by-email.dto';
import { User } from '@users/infra/entities/user.entity';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

export class FindByEmail {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email }: FindByEmailDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
