import { dataListItemType, ListItemType } from "../types";

export const ItemLists: ListItemType[] = [
    { label: 'Milk', value: 'milk'},
    { label: 'Water', value: 'water'},
    { label: 'Other', value: 'other'},
]

export const dataList: dataListItemType[] = [
    {
        type: 'milk',
        startAt: '01-08-2024',
        price: 50,
        unit: 'ltr',
        shift: 'full_day',
        records: [
            { type: 'Milk', date: '01-08-2024', quantity: 3.5, price: 50 },
            { type: 'Milk', date: '02-08-2024', quantity: 3.5, price: 50 },
            { type: 'Milk', date: '03-08-2024', quantity: 3.5, price: 50 },
            { type: 'Milk', date: '04-08-2024', quantity: 3.5, price: 50 },
            { type: 'Milk', date: '05-08-2024', quantity: 3.5, price: 50 },
        ]
    },
    {
        type: 'water',
        startAt: '01-08-2024',
        price: 20,
        unit: 'cane',
        shift: 'full_day',
        records: [
            { type: 'Water', date: '01-08-2024', quantity: 2, price: 50 },
            { type: 'Water', date: '04-08-2024', quantity: 2, price: 50 },
        ]
    }
]