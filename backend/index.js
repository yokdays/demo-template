import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'Connect from Backend' })
})


app.get('/api/stats', (req, res) => {
  res.json({
    labels: ['Success', 'Ongoing'],
    values: [12, 19],
  });
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})
