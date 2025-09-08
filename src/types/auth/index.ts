export interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'SENDER' | 'RECEIVER';
  phone: string;
  address: IAddress;
}

export interface ILogin {
  email: string,
  password: string
}

export type Role = 'ADMIN' | 'SENDER' | 'RECEIVER'

export interface IShowUser {
  _id: string
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  isBlocked: boolean;
  isVerified: boolean;
  address: IAddress;
}