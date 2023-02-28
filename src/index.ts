import express from 'express'
import session from 'express-session'
import * as dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const PORT = 3009
const URI = process.env.MONGO_URI

const app = express()
const client = new MongoClient(URI!)

const connectDb = async () => {
  try {
    await client.connect()
    console.log('Connected successfully to server')

    const database = client.db('test')
    const collection = database.collection('testers')

    const insertResult = await collection.insertMany([
      { name: 'tester one' },
      { a: 'tester two' },
      { a: 'tester three' },
    ])
    console.log('Inserted documents =>', insertResult)
  } catch (err) {
    console.error(err, 'mongo err')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

connectDb()

app.use(
  session({
    secret: 'some key',
    resave: false,
    saveUninitialized: false,
  })
)

app.get('/', (req, res) => {
  res.send('Habari Dunia')
})

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`)
})
