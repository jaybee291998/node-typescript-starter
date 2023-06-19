import * as dotenv from 'dotenv'

dotenv.config()

export default {
    APP_PORT: process.env.APP_PORT ?? 5555,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT ?? 'local',
}
