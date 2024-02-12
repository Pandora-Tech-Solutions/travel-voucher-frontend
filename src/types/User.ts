import { Address } from './Address';
import { Company } from './Company';
import { Roles } from './Roles';

export interface User {
  _id: string;
  name: string;
  cpf: string;
  rg?: string;
  phone: string;
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  address: Address;
  roles: Roles[];
  companies?: Company[];
}

export type Auth = {
  user: User;
  access_token: string;
};

export interface IUserQuery {
  page?: number;
  limit?: number;
  search?: string;
}

