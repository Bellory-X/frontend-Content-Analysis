import React from 'react';
import {Controller, FieldErrors, Path, useForm, useFormContext, UseFormRegister} from "react-hook-form";
import {IFormInput} from "../RegisterPage";
import {FormControl, FormHelperText, Input as _Input, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";


const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const  LoginInput = () => {

    const { control, formState: {errors} } = useFormContext()

    return (
        <div>
            <Controller
                name="login"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    maxLength: 20,
                    minLength: 5,
                    pattern: /^[A-Za-z]+$/i
                }}
                render={({ field }) => (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography
                            variant='body2'
                            sx={{ color: '#2363eb', mb: 1, fontWeight: 500 }}
                        >
                            User Name
                        </Typography>
                        <Input
                            {...field}
                            fullWidth
                            disableUnderline
                            sx={{ borderRadius: '1rem' }}
                        />
                        <FormHelperText >
                            {errors?.login?.type === "required" && "This field is require"}
                            {errors?.login?.type === "maxLength" && (
                                "User Name cannot exceed 20 characters"
                            )}
                            {errors?.login?.type === "minLength" && (
                                "User Name must be longer than 5 characters"
                            )}
                            {errors?.login?.type === "pattern" && (
                                "Alphabetical characters only"
                            )}
                        </FormHelperText>
                    </FormControl>
                )}
            />


        </div>
    );
};

export default LoginInput;