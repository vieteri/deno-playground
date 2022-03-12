interface data_t {
  user: string
}


const hello = async(context:any) => {

  let authenticated = await context.state.session.get('user')
  let email = '';
  if (!authenticated) {
    email = "not authenticated";
  }
  else {
    email = authenticated.email;
  }
  const data: data_t = { user: email };
  context.render('index.eta', data);
};
 
const cat = async(context:any) => {
  let authenticated = await context.state.session.get('user')
  let email = '';
  if (!authenticated) {
    email = "not authenticated";
  } else {
    email = authenticated.email;
  }

  const data: data_t = { user: email };
  context.render('cat.ejs', data);
};
export { hello, cat };