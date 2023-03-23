import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class DeleteUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('User does not exist');

    await this.usersRepository.delete(id);
  }
}
