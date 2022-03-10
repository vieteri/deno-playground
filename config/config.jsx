let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {
    
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      ssl: {
          rejectUnauthorized: false,
      }
  
  }

} else {
  config.database = {
    user: 'cqxxxrzh',
    database: 'cqxxxrzh',
    hostname: 'hattie.db.elephantsql.com',
    password: 'KPPZD5FadEa5yEvZdqhEpFQkxUYQW7hX',
    port: 5432
  };
}

export { config }; 
