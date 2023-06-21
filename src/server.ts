import express, { Express } from 'express'
import cors from 'cors'
import * as routes from './routes'
import authorizationMiddleware from './middlewares/authorizationMiddleware'
import logger from './logging/logger'
import morganMiddleware from './middlewares/morganMiddleware'
import errorHandler from './middlewares/errorMiddleware'

class Server {
    private app: Express

    constructor(app: Express) {
        if (!app) {
            throw new Error('Express instance is undefined')
        }
        this.app = app
        this.app.set('trust proxy', true)

        // middlewares
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(authorizationMiddleware)
        this.app.use(morganMiddleware.config)
    }

    start(port: string): void {
        this.app.listen(port, () => {
            // console.log(`[server]: Server is listening at ${port}`)
            logger.info(`[server]: Server is listening at ${port}`)
        })
    }

    routes(): Server {
        this.app.use('/__gtg', routes.gtgRoute)
        // this.app.use('/departments', routes.departmentroute)
        this.app.use('/employees', routes.employeeRoute)
        this.app.use('/products', routes.productRoute)
        this.app.use('/queries', routes.QueryHandingRoute)
        return this
    }

    errorHandler(): Server {
        this.app.use(errorHandler)
        return this
    }
}

const createServer = (app: Express) => new Server(app)

export default createServer
