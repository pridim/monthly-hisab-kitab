import React from 'react'
import { Link } from "react-router-dom";
import MoneySharpIcon from '@mui/icons-material/MoneySharp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Box, Button } from '@mui/material';

const LandingPage = () => {
    return <div className="App">
        <Box className="logo-wrapper">
            <CurrencyRupeeIcon style={{ fontSize: '5rem'}} />
            <MoneySharpIcon style={{ fontSize: '5rem'}} />
        </Box>
        <Box mt={2} mb={6}>
            <h2>Monthly Hisab Kitab</h2>
            <span className='sub-desc-3'>(<i> Lets manage monthly grocery and others expenses. </i>)</span>
        </Box>
        <Button color='error' variant='outlined' size='large'>
            <Link to="/member-types">Lets start</Link>
        </Button>
    </div>
}

export default LandingPage;
