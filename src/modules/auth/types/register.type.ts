export interface Register {
    id: string,
    fullname: string,
    age: number,
    email: string,
    password: string
}

export interface Login{
    email:string,
    password: string,
}