import { Request } from 'express';

import { User } from '@users/infra/entities';

export interface IAuthRequest extends Request {
  user: User;
}
