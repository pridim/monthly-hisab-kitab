import React from 'react'
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MemberTypes = () => {
    const navigate = useNavigate();

    return <Box>
        <Box component="h3">Choose a member type to start</Box>
        <Button color="primary" variant='outlined' size='large' fullWidth
            onClick={()=> navigate(`/registration/buyer`)}
        >
            Buyer
        </Button>
        <Box component="h5">OR</Box>
        <Button color="secondary" variant='outlined' size='large' fullWidth
            onClick={()=> navigate(`/registration/provider`)}
        >
            Provider
        </Button>
    </Box>
}

export default MemberTypes;
