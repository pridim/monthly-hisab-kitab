export type ListItemType = {
    label: string;
    value: string;
}

export interface RecordType {
    type: string;
    quantity: number;
    date: string;
    amount: number;
}

export interface RecordType {
    type: string;
    date: string;
    quantity: number;
    amount: number;
}

export interface StoredRecordType {
    phone: string;
    userType: string;
    records: RecordType[]
    startAt: string;
    unit: string;
    price: {
        [key: string]: number;
    };
}