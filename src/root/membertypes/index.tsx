import React from 'react'
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const MemberTypes = () => {
    return <Box>
        <Box component="h3">Choose a member type to start</Box>
        <Button color="primary" variant='outlined' size='large' fullWidth>
            <Link to={`/registration`}>Buyer</Link>
        </Button>
        <Box component="h5">OR</Box>
        <Button color="secondary" variant='outlined' size='large' fullWidth>
            <Link to={`/registration`}>Provider</Link>
        </Button>
    </Box>
}

export default MemberTypes;
