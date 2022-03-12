import { executeQuery, executeObject } from "../../database/database.jsx";

interface data_t {
    user: string;
    errors : string[];
    name : string;
    email : string[];
  }
  const getDataEmails = async (context:any) => {
    let user_data: any = await context.state.session.get('user');
    let errors:string[] = [];
    let data: data_t  = { user: user_data, errors: [], name : '', email: [] };
    const res =  await executeQuery(`SELECT email FROM users`);
    if (!user_data) {
      data.user = 'not authenticated';
    } else {
      data.user = user_data.email;
    }
    if (context.request) {
      const body:any = context.request.body();
      const params:any = await body.value;
     
    }
    console.log(JSON.stringify(res.rows))
    for (var i = 0; i < res.rows.length; i++) {
        // Iterate over numeric indexes from 0 to 5, as everyone expects.
        data.email.push(JSON.stringify(res.rows[i].email));
    }
    console.log(data.email)
    return data;
  };

const getAllUsers = async(context:any) => {
    // check if the email exists in the database
    context.render('summary', await getDataEmails(context));
  }

  export {getAllUsers};