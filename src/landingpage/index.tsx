import React from 'react'
import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';
import AppLogo from '../common/applogo';

const LandingPage = () => {
    return <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <AppLogo />
        <Box mt={2} mb={6}>
            <h2>Monthly Hisab Kitab</h2>
            <span className='sub-desc-3'>(<i> Lets manage monthly grocery and others expenses. </i>)</span>
        </Box>
        <Button color='error' variant='outlined' size='large'>
            <Link to="/member-types">Lets start</Link>
        </Button>
    </Box>
}

export default LandingPage;
