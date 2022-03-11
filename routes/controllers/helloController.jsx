
const hello = async(context) => {
  const data = {};
  let authenticated = await context.state.session.get('user')
  let email = '';
  if (!authenticated) {
    email = "not authenticated";
  } else {
    email = authenticated.email;
  }

  data.user = email;
  context.render('index.eta', data);
};
 
const cat = async(context) => {
  const data = {};
  let authenticated = await context.state.session.get('user')
  let email = '';
  if (!authenticated) {
    email = "not authenticated";
  } else {
    email = authenticated.email;
  }

  data.user = email;
  context.render('cat.ejs', data);
};
export { hello, cat };