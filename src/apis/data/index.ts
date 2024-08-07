import { ListItemType, StoredRecordType } from "../types";

export const ItemLists: ListItemType[] = [
    { label: 'Milk', value: 'milk'},
    { label: 'Water', value: 'water'}
]

export const dataList: StoredRecordType[] = [
    {
        phone: '8686340975',
        userType: 'Buyer',
        startAt: '01-08-2024',
        price: { 'milk': 50 },
        unit: 'ltr',
        records: [
            { type: 'Milk', date: '01-08-2024', quantity: 3.5, amount: 50 },
            { type: 'Milk', date: '02-08-2024', quantity: 3.5, amount: 50 },
            { type: 'Milk', date: '03-08-2024', quantity: 3.5, amount: 50 },
            { type: 'Milk', date: '04-08-2024', quantity: 3.5, amount: 50 },
            { type: 'Milk', date: '05-08-2024', quantity: 3.5, amount: 50 },
        ]
    },
    {   phone: '8686340975',
        userType: 'Buyer',
        startAt: '01-08-2024',
        price: { 'water': 50 },
        unit: 'cane',
        records: [
            { type: 'Water', date: '01-08-2024', quantity: 2, amount: 50 },
            { type: 'Water', date: '04-08-2024', quantity: 2, amount: 50 },
        ]
    }
]