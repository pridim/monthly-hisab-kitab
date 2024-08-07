import React from 'react'
import { getFirstCapLetter, getLoggedInUserDetails, getPrefix } from '../../utils'
import { Box } from '@mui/material';
import maleProfilePic from "./../../assets/images/male_avtar.jpeg";
import femaleProfilePic from "./../../assets/images/female_avtar.jpeg";
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const loggedInUser = getLoggedInUserDetails();
    return loggedInUser && <Box width="100%"
        display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box component="h2" mb={0}>
            Hello, {getPrefix(loggedInUser.user.gender)} {getFirstCapLetter(loggedInUser.user.username)}
        </Box>
        <img
            src={loggedInUser.user.gender === 'male' ? maleProfilePic : femaleProfilePic}
            style={{width:"230px", height:"230px"}}
            alt="user profile"
        />
        <Box width="100%" display="flex" flexDirection="column" rowGap={1}>
            {Object.keys(loggedInUser.user).map((key) => <Box key={key} columnGap={1}
                display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Box className="list-item-key">{key}</Box>
                <Box className="list-item-value">{loggedInUser.user[key]}</Box>
            </Box>)}
        </Box>
        <Box position='fixed' bottom='5rem'>
            <Link to="/login">Logout</Link>
        </Box>
    </Box>
}

export default UserProfile;
