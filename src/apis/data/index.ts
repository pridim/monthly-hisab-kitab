import { ListItemType, StoredRecordType } from "../types";

export const ItemLists: ListItemType[] = [
    { label: 'Milk', value: 'milk'},
    { label: 'Water', value: 'water'}
]

export const dataList: StoredRecordType[] = [
    {
        id: 0,
        phone: '8686340975',
        userType: 'Buyer',
        startAt: '01-08-2024',
        price: { 'milk': 50, 'water': 20 },
        unit: 'ltr',
        records: [
            { recordId:0, type: 'Milk', date: '01-08-2024', quantity: 3.5, amount: 50 },
            { recordId:1, type: 'Milk', date: '02-08-2024', quantity: 3.5, amount: 50 },
            { recordId:2, type: 'Milk', date: '03-08-2024', quantity: 3.5, amount: 50 },
            { recordId:3, type: 'Milk', date: '04-08-2024', quantity: 3.5, amount: 50 },
            { recordId:4, type: 'Milk', date: '05-08-2024', quantity: 3.5, amount: 50 },
            { recordId:5, type: 'Water', date: '01-08-2024', quantity: 2, amount: 50 },
            { recordId:6, type: 'Water', date: '04-08-2024', quantity: 2, amount: 50 },
        ]
    }
]