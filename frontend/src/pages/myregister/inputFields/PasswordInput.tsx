import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import {FormControl, FormHelperText,  Input as _Input, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;



const PasswordInput = () => {

    const { control, formState: {errors} } = useFormContext()

    return (
        <div>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    maxLength: 20,

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
                            {errors?.password?.type === "required" && <p>This field is required</p>}
                        </FormHelperText>
                    </FormControl>
                )}
            />
        </div>
    );
};

export default PasswordInput;