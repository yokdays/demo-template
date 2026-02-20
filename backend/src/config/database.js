import sql from 'mssql';
import env from '../config/env.js'; 

const config = {
    // ต้องระบุ property 'server' และต้องเป็น string
    server: env.DB_SERVER || 'localhost', // มั่นใจว่า env.DB_SERVER มีค่าเป็น string
    authentication: {
        type: 'default',
        options: {
            userName: env.DB_USER, // ตรวจสอบว่าใน env.js มี export ค่านี้ไหม
            password: env.DB_PASSWORD,
        }
    },
    options: {
        database: env.DB_NAME,
        encrypt: true, // สำหรับ Azure หรือ SQL Server รุ่นใหม่ๆ
        trustServerCertificate: true // สำคัญมาก! ถ้าใช้ในเครื่องตัวเอง (Local)
    },
    port: parseInt(env.DB_PORT) || 1433 // พอร์ตต้องเป็น number
};

let pool;

export async function getPool() {
    if (pool) return pool;
    try {
        // ส่ง config เข้าไปที่ sql.connect
        pool = await sql.connect(config);
        console.log('✅ SQL Server connected');
        return pool;
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        throw err;
    }
}

export { sql };