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
const getRefreshTokenCookieOptions = (): CookieOptions =>({
        ...defaults,
        //cookie expires in 30 days  
        expires: new Date(Date.now()+30*24*60*60*1000),
        path : "/auth/refresh"
})
export const setAuthCookies = ( res :Response , accessToken : string , refreshToken:string):Response=>{
    return res.cookie("token",accessToken , getAccessTokenCookieOptions()).cookie("refreshToken",refreshToken,getRefreshTokenCookieOptions());
}
