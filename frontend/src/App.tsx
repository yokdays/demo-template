import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    axios.get('/api/health')
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-white text-3xl font-bold">
        {status}
      </h1>
    </div>
  )
}
