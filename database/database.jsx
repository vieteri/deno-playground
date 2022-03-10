import { Pool } from "../deps.jsx";
import { config } from "../config/config.jsx";

const getClient = () => {
  return new Pool(config.database);
}



const CONCURRENT_CONNECTIONS = 2;
let connectionPool;

if (Deno.env.get("DATABASE_URL")) {
  connectionPool = new Pool(Deno.env.get("DATABASE_URL"), CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool(config.database, CONCURRENT_CONNECTIONS);
}


const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};




const executeObject = async(query, ...args) => {
  const client = getClient();
  console.log(...args)
  try {
    await client.connect();
    return await client.queryObject(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

export { executeQuery, executeObject };

