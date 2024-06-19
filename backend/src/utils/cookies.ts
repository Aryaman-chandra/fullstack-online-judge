import { CookieOptions, Response } from "express"

const defaults:CookieOptions = {
    sameSite : 'strict',
    httpOnly: true,
}
const getAccessTokenCookieOptions = (): CookieOptions =>({
        ...defaults,
        //cookie expires in 15min
        expires: new Date(Date.now()+15*60*1000)
})
export const setAuthCookies = ( res :Response , accessToken : string ):Response=>{
    return res.cookie("token",accessToken , getAccessTokenCookieOptions());
}