import type { Role } from "../auth"

interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ISenderParcel {
    _id: string;
    type: string;
    weight: string;
    fee: number;
    isCanceled: boolean;
    deliveryDate: Date;
    address: {
        from: IAddress;
        to: IAddress;
    };
    status: Role;
    receiverEmail: {
        email: string;
    }
}