import React from 'react'
import MoneySharpIcon from '@mui/icons-material/MoneySharp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Box } from '@mui/material';

const AppLogo = () => {
    return <Box className="logo-wrapper">
        <CurrencyRupeeIcon style={{ fontSize: '5rem'}} />
        <MoneySharpIcon style={{ fontSize: '5rem'}} />
    </Box> 
}

export default AppLogo;
