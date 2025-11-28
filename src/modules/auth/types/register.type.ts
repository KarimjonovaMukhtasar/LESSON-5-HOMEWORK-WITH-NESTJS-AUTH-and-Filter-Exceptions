import { Roles } from "./roles.enum"

export interface Register {
    id: string,
    fullname: string,
    age: number,
    email: string,
    password: string,
    role: Roles
}

export interface Login{
    email:string,
    password: string,
}