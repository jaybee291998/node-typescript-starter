import express, { Express, Request, Response, Router } from 'express'
import environment from '../environment'

const router = express.Router()

router.get('/', (req: Request, resp: Response) => {
    const apiData = {
        version: '1.0.0',
        status: 'up',
        environment: environment.APP_ENVIRONMENT,
    }
    resp.status(200).json(apiData)
})

export default router
