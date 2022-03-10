import { executeQuery, executeObject } from "./database/database.jsx";
import {bcrypt} from "./deps.jsx"
import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";


await executeQuery(`delete from users where email = $1`, ["rupitin.tran@gmail.com"]);
let pass = "pösä";
let hash = await bcrypt.hash("pösä");
await executeQuery(`insert into users (email, password) VALUES ($1,$2)`, ["rupitin.tran@gmail.com", hash]);
const res = await executeQuery(`SELECT * FROM users where email = $1`, ["rupitin.tran@gmail.com"]);

const passwordCorrect = await bcrypt.compare(pass, hash);
console.log(hash)
console.log(res.rows[0].password)
console.log(passwordCorrect);