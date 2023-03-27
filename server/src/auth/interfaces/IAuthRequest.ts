import { Request } from 'express';

import { User } from '@users/infra/entities/user.entity';

export interface IAuthRequest extends Request {
  user: User;
}
