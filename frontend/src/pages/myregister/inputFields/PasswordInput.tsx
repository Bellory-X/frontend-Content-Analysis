import React from 'react';
import {FieldErrors, Path, UseFormRegister} from "react-hook-form";
import {IFormInput} from "../RegisterPage";

type PasswordProps = {
    label: Path<IFormInput>;
    register: UseFormRegister<IFormInput>;
    errors: FieldErrors<IFormInput>
};

const PasswordInput = ({ label, register, errors }: PasswordProps) => {
    return (
        <div>
            <label>{label}</label>
            <input {...register(label, {
                required: true,
                pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.password?.type === "required" && <p>This field is required</p>}
            {errors?.password?.type === "pattern" && (
                <p>Alphabetical characters only</p>
            )}
        </div>
    );
};

export default PasswordInput;