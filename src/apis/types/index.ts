export type ListItemType = {
    label: string;
    value: string;
}

type shiftType = "morning" | "evening" | "full_day"

export interface RecordType {
    type: string;
    quantity: number;
    date: string;
    price: number;
}

export interface dataListItemType {
    type: string;
    startAt: string;
    price: number;
    unit: string;
    shift: string;
    records: RecordType[]
}
