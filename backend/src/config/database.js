import sql from 'mssql';
import env from '../config/env.js'; 

const config = {
    server: env.DB_SERVER, // หรือ env.DB_SERVER
    authentication: {
        type: 'default',
        options: {
            userName: env.DB_USER,
            password: env.DB_PASSWORD,
        }
    },
    options: {
        encrypt: false, 
        trustServerCertificate: true, // ต้องเป็น true เสมอถ้าต่อ IP ภายใน
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1' // บังคับให้ใช้ TLS รุ่นเก่า
        }
    },
    port: 1433
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