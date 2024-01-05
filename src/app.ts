import express from 'express'
import dotenv from 'dotenv'
import router from './http/routes'
import bodyParser from 'body-parser'

const app = express()

dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

export default app
