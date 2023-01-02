import pkg from 'pg';

const { Pool } = pkg;

export const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '20011206',
  database: 'my_server'
});

