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

const SignUpTypography = () => {
    return (
        <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
            Need an account? <LinkItem to='/register'>Sign Up Here</LinkItem>
        </Typography>
    );
};

export default SignUpTypography;