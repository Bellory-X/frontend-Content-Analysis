import React from 'react';
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginTypograhy = () => {
    return (
        <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
            Already have an account?{' '}
            <LinkItem to='/login'>Login Here</LinkItem>
        </Typography>
    );
};

export default LoginTypograhy;