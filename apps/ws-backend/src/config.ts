export const POSTGRES_DB_URL = process.env.POSTGRES_DB_URL || 'postgresql://postgres:pratham@localhost:5432/drawapp';
export const REDIS_DB_URL = process.env.REDIS_DB_URL || 'redis://localhost:6379';
export const JWT_AUTH_SECRET = process.env.JWT_AUTH_SECRET || 'dev_secret';