import db from 'mysql2/promise';

export const conn = async () => {
  return db.createConnection({
    host: process.env.NEXT_PUBLIC_DATABASE_HOST,
    port: process.env.NEXT_PUBLIC_DATABASE_PORT,
    user: process.env.NEXT_PUBLIC_DATABASE_USER,
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: process.env.NEXT_PUBLIC_DATABASE_DATABASE,
  });
};
