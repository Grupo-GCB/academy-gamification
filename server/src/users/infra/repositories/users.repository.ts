import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterUserDTO } from '@users/dto/register-user-dto';
import { User } from '@users/infra/entities/user.entity';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({
    name,
    email,
    password,
    role,
  }: RegisterUserDTO): Promise<User> {
    const user: User = this.usersRepository.create({
      name,
      email,
      password,
      role,
    });

    return this.usersRepository.save(user);
  }
}
