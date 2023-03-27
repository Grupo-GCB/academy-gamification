import { BusinessUnits, Roles } from '@shared/constants';

export interface IUserFromJwt {
  id: string;
  email: string;
  bu: BusinessUnits;
  role: Roles;
}
