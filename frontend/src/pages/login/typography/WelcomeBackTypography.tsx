import React from 'react';
import {Typography} from "@mui/material";

const WelcomeBackTypography = () => {
    return (
        <Typography
            textAlign='center'
            component='h1'
            sx={{
                color: '#f9d13e',
                fontWeight: 600,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                letterSpacing: 1,
            }}
        >
            Welcome Back!
        </Typography>
    );
};

export default WelcomeBackTypography;