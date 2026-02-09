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
    labels: ['ตอบแบบสอบถามครบถ้วน', 'กำลังอยู่ในขั้นตอนตอบแบบสอบถาม'],
    values: [60, 131],
  });
});

app.get('/api/insight', (req, res) => {
  res.json({
    labels: ['ตอบแบบสอบถามครบถ้วน', 'กำลังอยู่ในขั้นตอนตอบแบบสอบถาม'],
    values: [41, 122],
  });
});

app.get('/api/outsight', (req, res) => {
  res.json({
    labels: ['ตอบแบบสอบถามครบถ้วน', 'กำลังอยู่ในขั้นตอนตอบแบบสอบถาม'],
    values: [19, 9],
  });
});

app.get('/api/recruit', (req, res) => {
  res.json({
    labels: ['นัดหมายสำเร็จ', 'อยู่ในขั้นตอนการนัดหมาย', 'ปฎิเสธที่จะเข้าร่วม'],
    values: [70, 19, 12],
  });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on`)
  console.log(`   Local   : http://localhost:${PORT}`)
  console.log(`   Network : http://192.168.x.x:${PORT}`)
})
