export  interface IHeaders{
    name : string,
    link : string
}
export const   headers:IHeaders[] = [
    {
        name : 'Sign In',
        link : '/auth/sign-in'
    },
    {
        name : 'Sign Up',
        link : '/auth/sign-up'
    },
    {
        name : 'Problems',
        link : '/problems'
    }
];