import React from 'react';
import {Typography} from "@mui/material";

const WelcomeToContentAnalysisTypography = () => {
    return (
        <Typography
            textAlign='center'
            component='h1'
            sx={{
                color: '#f9d13e',
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 600,
                mb: 2,
                letterSpacing: 1,
            }}
        >
            Welcome to Content Analysis!
        </Typography>
    );
};

export default WelcomeToContentAnalysisTypography;