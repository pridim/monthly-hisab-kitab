import { ListItemType, StoredRecordType } from "../types";

export const ItemLists: ListItemType[] = [
    { label: 'Milk', value: 'milk'},
    { label: 'Water', value: 'water'}
];

export const FilterByOptions: ListItemType[] = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
]

export const YearsList = [
    { label: '2026', value: '2026' },
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    { label: '2020', value: '2020' }
];
export const MonthsList = [
    { label: 'Jan', value: '1' },
    { label: 'Feb', value: '2' },
    { label: 'Mar', value: '3' },
    { label: 'Apr', value: '4' },
    { label: 'May', value: '5' },
    { label: 'Jun', value: '6' },
    { label: 'Jul', value: '7' },
    { label: 'Aug', value: '8' },
    { label: 'Sep', value: '9' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' },
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