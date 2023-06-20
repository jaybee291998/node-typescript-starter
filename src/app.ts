import express, { Express, Request, Response } from 'express'
import environment from './environment'
import createServer from './server'

const app: Express = express()
const appPort = environment.APP_PORT

createServer(app).routes().errorHandler().start(appPort)
