// When using RTK Query it’s recommended by the Redux community to put all the API definitions
// relating to a particular resource in one file.

export interface IUser {
    name: string;
    email: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IGenericResponse {
    status: string;
    message: string;
}