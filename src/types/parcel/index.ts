export type Status = "REQUESTED" | "APPROVED" | "DISPATCHED" | "INTRANSIT" | "DELIVERED"

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
    status: Status;
    receiverEmail: {
        email: string;
    }
}

export interface IReceiverParcel {
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
    status: Status;
    senderEmail: {
        email: string;
    }
}

export interface IDeliveryDetails {
    _id?: string
    from: string;
    type: string;
    status: Status;
    note: string;
    location: string;
    time: Date
}

export interface IParcel {
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
    status: Status;
    senderEmail: {
        email: string;
    }
    receiverEmail: {
        email: string;
    }
}