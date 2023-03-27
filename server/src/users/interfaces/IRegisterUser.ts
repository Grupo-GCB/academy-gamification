import { BusinessUnits, Roles } from '@shared/constants';

export class IRegisterUser {
  name: string;
  email: string;
  password: string;
  business_unit: BusinessUnits;
  role: Roles;
}
