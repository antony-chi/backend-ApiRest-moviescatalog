export const authReq = (req, res, next) => {
    const cookies = req.cookies
    console.log(cookies)
    next()
}