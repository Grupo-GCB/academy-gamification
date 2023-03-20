import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from '@shared/constants';
import { DeleteUserDTO } from '@users/dto';
import { IUsersRepository } from '@users/interfaces/IUsersRepository';

@Injectable()
export class DeleteUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ user, admin }: DeleteUserDTO): Promise<void> {
    const userToDelete = await this.usersRepository.findOne(user);
    const adminResponsible = await this.usersRepository.findOne(admin);

    if (!userToDelete || !adminResponsible)
      throw new NotFoundException('User or admin does not exist');

    if (adminResponsible.role != Roles.ADMIN)
      throw new UnauthorizedException('Only admins can delete users');

    if (user === admin)
      throw new MethodNotAllowedException('Unable to delete yourself');

    await this.usersRepository.delete(user);
  }
}
