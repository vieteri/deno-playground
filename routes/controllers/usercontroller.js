import { executeQuery, executeObject } from "../database/database.js";
import {bcrypt, isEmail} from "../deps.js";

const showRegisterForm = async({render}) => {
    const errors = [];
    render('register.ejs', {user: 'not authenticated', errors: errors});
  };
  
const register = async({request, response, render, session}) => {
  const body = request.body();
  const params = await body.value;
  const errors = [];
  const email = params.get('email');
  const password = params.get('password');
  const verification = params.get('verification');

  // here, we would validate the data, e.g. checking that the 
  // email really is an email
  if (password !== verification) {
    errors.push('The entered passwords did not match');
  }

  if (password.length<4) {
    errors.push('Password length is too small');
  }

  // check if there already exists such an email in the database
  // -- if yes, respond with a message telling that the user
  // already exists
  const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
  if (existingUsers.rowCount > 0) {
    errors.push('The email is already reserved.');
  }

  if (errors.length>0) {
    render('register.ejs', {user: 'not authenticated', errors: errors});
  } else {

    // otherwise, store the details in the database
    const hash = await bcrypt.hash(password);
    // when storing a password, store the hash    
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    response.redirect('/auth/login');
  }
};
  
const showLoginForm = async(context) => {
  let errors = [];
  let authenticated = await context.state.session.get('authenticated');
  if (authenticated) {
    context.response.redirect('/behavior');
  } else {
    context.render('login.eta', {user: 'not authenticated', errors: errors});
  }
  
}
  
const authenticate = async({request, render, response, session}) => {
  const body = request.body();
  const params = await body.value;
  const errors = []
  const email = params.get('email').toLowerCase();
  const password = params.get('password');
  
  
  // check if the email exists in the database
  const res = await executeObject("SELECT * FROM users WHERE email = $1;", email);
  const userObj = res.rows[0];
  if (res.rowCount === 0) {
      errors.push('email not found from database');
  } else  {
    const hash = userObj.password;
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
      errors.push('password is wrong');
    }      
  }
  if (errors.length>0) {
    render('login.ejs', {user: "not authenticated", errors: errors});
  } else {
  await session.set('authenticated', true);
  await session.set('user', {
      id: userObj.id,
      email: userObj.email
  });
  response.redirect('/');
}
}
const logout = async(context) => {
  await context.state.session.set('authenticated', false);
  await context.state.session.set('user', {
      id: null,
      email: "not authenticated"
  });
  context.response.redirect('/')
  //context.response.redirect('/', {user: "not authenticated"});
}


export {showRegisterForm, register, authenticate, showLoginForm, logout}
