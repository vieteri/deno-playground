let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
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
