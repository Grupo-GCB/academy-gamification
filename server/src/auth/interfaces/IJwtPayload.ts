import { BusinessUnits, Roles } from '@shared/constants';

export interface IJwtPayload {
  sub: string;
  email: string;
  bu: BusinessUnits;
  role: Roles;
  iat?: number;
  exp?: number;
}
