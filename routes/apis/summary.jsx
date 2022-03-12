import { executeQuery } from "../../database/database.jsx";


const getsummary =async (start, end, context) => {
    if (shit) {
        const data = {
            sleep: '',
            sports: '',
            study: '',
            sleepquality: '',
            moodmorning: '',
            moodevening: ''
        };
        return data;
    }
    const morning= await executeQuery('SELECT AVG(sleeptime), AVG(sleepquality), AVG(mood) FROM morningbehaviour  WHERE dt BETWEEN $1 AND $2;', start, end);
    const evening= await executeQuery('SELECT AVG(sports), AVG(study), AVG(mood) FROM eveningbehaviour WHERE dt BETWEEN $1 AND $2;', start, end);
 //   const study= await executeQuery('SELECT AVG(study) FROM eveningbehaviour WHERE dt BETWEEN $1 AND $2;', start, end);
 //   const sleepquality= await executeQuery('SELECT AVG(sleepquality) FROM morningbehaviour WHERE dt BETWEEN $1 AND $2;', start, end);
 //   const moodmorning = await executeQuery('SELECT AVG(mood) FROM morningbehaviour WHERE dt BETWEEN $1 AND $2;', start, end);
 //   const moodevening = await executeQuery('SELECT AVG(mood) FROM eveningbehaviour WHERE dt BETWEEN $1 AND $2;', start, end);
    const data = {
        sleep: morning.rows[0][0],
        sleepquality: morning.rows[0][1],
        moodmorning: morning.rows[0][2],
        sports: evening.rows[0][0],
        study: evening.rows[0][1],
        moodevening: evening.rows[0][2]
    };
    return data;
}


const getdate = (today) => {
    var dd = String(today. getDate()). padStart(2, '0');
    var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    var yyyy = today. getFullYear();
    const day = yyyy + '-' + mm + '-' + dd;
    return day
}
const summary = async(context, startdate, enddate) => {
    const date = new Date();
    const today = getdate(date);
    const data = {};
    var date1 = new Date(new Date().setDate(new Date().getDate() - 30));
    var date2 = new Date(new Date().setDate(new Date().getDate() - 7));
    const last30days = getdate(date1);
    const last7days = getdate(date2);


    let authenticated = await context.session.get('user')
    let email = '';
    if (!authenticated) {
      email = "not authenticated";
    } else {
      email = authenticated.email;
    }

    data.user = email;
    data.month = await getsummary(last30days, date);
    data.week = await getsummary(last7days, date);
    context.render('summary.ejs', data)
}



export {summary}
