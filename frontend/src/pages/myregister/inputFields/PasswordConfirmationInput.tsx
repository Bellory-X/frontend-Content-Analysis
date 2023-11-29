import React from 'react';
import {FieldErrors, Path, UseFormRegister} from "react-hook-form";
import {IFormInput} from "../RegisterPage";

type PasswordConfirmationProps = {
    label: Path<IFormInput>;
    register: UseFormRegister<IFormInput>;
    errors: FieldErrors<IFormInput>
};

const PasswordConfirmationInput = ({ label, register, errors }: PasswordConfirmationProps) => {
    return (
        <div>
            <label>{label}</label>
            <input {...register(label, {
                required: true,
                pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.password_confirmation?.type === "required" && <p>This field is required</p>}
            {errors?.password_confirmation?.type === "pattern" && (
                <p>Alphabetical characters only</p>
            )}
        </div>
    );
};

export default PasswordConfirmationInput;