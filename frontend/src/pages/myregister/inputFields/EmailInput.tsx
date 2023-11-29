import React from 'react';
import {Controller,  useFormContext} from "react-hook-form";
import {FormControl, FormHelperText,  Input as _Input, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const EmailInput = () => {

    const { control, formState: {errors} } = useFormContext()

    return (
        <div>

            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    maxLength: 20,
                    minLength: 5,
                    // pattern: /^[A-Za-z]+$/i
                }}
                render={({ field }) => (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography
                            variant='body2'
                            sx={{ color: '#2363eb', mb: 1, fontWeight: 500 }}
                        >
                            Email Address
                        </Typography>
                        <Input
                            {...field}
                            fullWidth
                            disableUnderline
                            sx={{ borderRadius: '1rem' }}
                            type="email"
                        />
                        <FormHelperText >
                            {errors?.email?.type === "required" && "This field is require"}
                            {errors?.email?.type === "maxLength" && (
                                "Email cannot exceed 20 characters"
                            )}
                            {errors?.email?.type === "minLength" && (
                                "Email must be longer than 5 characters"
                            )}

                        </FormHelperText>
                    </FormControl>
                )}
            />
        </div>
    );
};

export default EmailInput;