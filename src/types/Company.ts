import { Address } from './Address';

export interface Company {
  _id: string;
  companyName: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phone: string;
  address: Address;
}
