interface data_t {
  user: string;
  errors : string[];
  name : string;
  email : string;
}
const getData = async (context:any) => {
  let user_data:any = (await context.state.session.get('user'));
  let errors:string[] = [];
  let data: data_t  = { user: user_data, errors: [], name : '', email: '' };
  if (!user_data) {
    data.user = 'not authenticated';
  } else {
    data.user = user_data.email;
  }

  return data;
};

const hello = async(context:any) => {
  context.render('index.eta', await getData(context));
};
 
const cat = async(context:any) => {
  context.render('cat.ejs', await getData(context));
};
export { hello, cat };