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

const RecoveryButton = () => {
    return (
        <div>
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                Forgot your password?{' '}
                <LinkItem to='/recovery'>Restore password by email</LinkItem>
            </Typography>
        </div>
    );
};

export default RecoveryButton;