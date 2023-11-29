import React from 'react';
import {styled} from "@mui/material/styles";
import {FormControl, FormHelperText, Input as _Input, Typography} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

const InputRecoveryCodePage = () => {

    const { control, formState: {errors} } = useFormContext()

    return (
        <div>
            <Controller
                name="recoveryCode"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography
                            variant='body2'
                            sx={{ color: '#2363eb', mb: 1, fontWeight: 500 }}
                        >
                            Recovery Code
                        </Typography>
                        <Input
                            {...field}
                            fullWidth
                            disableUnderline
                            sx={{ borderRadius: '1rem' }}
                        />
                        <FormHelperText >
                            {errors?.email?.type === "required" && "This field is require"}

                        </FormHelperText>
                    </FormControl>
                )}
            />
        </div>
    );
};

export default InputRecoveryCodePage;