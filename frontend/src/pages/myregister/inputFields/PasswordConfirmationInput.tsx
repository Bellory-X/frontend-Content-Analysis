import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import {styled} from "@mui/material/styles";
import {FormControl, FormHelperText, Input as _Input, Typography} from "@mui/material";

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;


const PasswordConfirmationInput = () => {

    const { control, formState: {errors} } = useFormContext()

    return (
        <div>

            <Controller
                name="password_confirmation"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    maxLength: 20
                }}
                render={({ field }) => (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography
                            variant='body2'
                            sx={{ color: '#2363eb', mb: 1, fontWeight: 500 }}
                        >
                            Password
                        </Typography>
                        <Input
                            {...field}
                            fullWidth
                            disableUnderline
                            sx={{ borderRadius: '1rem' }}
                            type="password"
                        />
                        <FormHelperText >
                            {errors?.password_confirmation?.type === "required" && "This field is required"}
                        </FormHelperText>
                    </FormControl>
                )}
            />
        </div>
    );
};

export default PasswordConfirmationInput;