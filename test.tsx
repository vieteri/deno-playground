import { executeQuery, executeObject } from "./database/database.jsx";
import {bcrypt} from "./deps.jsx"
import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";


const res =  await executeQuery(`SELECT * FROM users where email::varchar = $1::varchar`, ["viet_trar@windowslive.com"]);
  const userObj = res.rows[0];
  console.log(res.rows.length)
  /*
  if (res.rowCount === 0) {
      console.log('email not found from database');
  }
  else{
    console.log('email found from database');
  }*/