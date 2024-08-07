import React from 'react';
import { getLoggedInUserDetails } from '../../../utils';
import CustomCard from '../../../common/CustomCard';
import { StoredRecordType } from '../../../apis/types';
import { RecordType } from '../../../apis/types';

interface DashboardItemProps {
    ItemActionType: string;
}

const DashboardItem = (props: DashboardItemProps) => {
    const { ItemActionType } = props;
    const user = getLoggedInUserDetails()
    const storedRecords = localStorage.getItem('records');
    const dataList = storedRecords ? JSON.parse(storedRecords) : []

    const filteredDataList = dataList.map((item: StoredRecordType) => {
        if(item.userType === user.userType) {
            const filteredRecords = item.records.filter((record: RecordType) => record.type === ItemActionType)
            return {
                ...item,
                records: filteredRecords
            }
        }
        return null;
    })

    let comp;
    if(filteredDataList.length === 0)
        comp = <CustomCard message="No records found!" />;
    else
        comp = <CustomCard cardContent={filteredDataList[0]} ItemActionType={ItemActionType} message=''/>;

    return comp
}

export default DashboardItem;
