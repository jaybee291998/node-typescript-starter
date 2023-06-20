import { Request, Response, NextFunction } from 'express'

function authorizationMiddleware(
    req: Request,
    resp: Response,
    next: NextFunction
): void {
    console.log('~~ simple middleware begin')
    const urlPath = req.url
    const authorizationToken = req.headers['authorization']
    console.log(`url path: ${urlPath}`)
    if (urlPath.startsWith('/api') && !authorizationToken) {
        resp.status(401).json({ message: 'invalid_authorization token' })
        return
    }

    next()
    console.log('~~ simple middleware end')
}

export default authorizationMiddleware
