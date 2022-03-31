import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes'
const app = express()
const port = process.env.port || 8000
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/test'
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to mongo',mongoUrl)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
}
)
app.use('/', router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
