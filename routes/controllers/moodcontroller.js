import { getmoodsmorning, getmoodsevening, getDatamorning, validatemorning, getDataevening, validateevening, getsummaryuser} from "../../services/moodService.js" 
import {validate} from "../../deps.js"
import {executeQuery} from "../../database/database.js"
const getmoods = async(context) => {
    let authenticated = await context.session.get('user')
    let email = '';
    if (!authenticated) {
      email = 'not authenticated';
    } else {
      email = authenticated.email;
    }
      context.render('behaviour.ejs', { user: email,
        morningmoods: await getmoodsmorning(authenticated.id), 
        eveningmoods: await getmoodsevening(authenticated.id)
      })
    }

  const getmorning = async(context) => {
    let authenticated = await context.session.get('user')
    let email = '';
    if (!authenticated) {
      email = 'not authenticated';
      context.response.redirect('/auth/login');
    } else {
      const data = await getDatamorning();
      data.user = authenticated.email;
      data.id = authenticated.id

      context.render('behaviourmorning.ejs', data) 
  
    }
  }

  const getevening = async(context) => {
    let authenticated = await context.session.get('user')
    let email = '';
    if (!authenticated) {
      email = 'not authenticated';
      context.response.redirect('/auth/login');
    } else {
      const data = await getDataevening();
      data.user = authenticated.email;
      data.id = authenticated.id

      context.render('behaviourevening.ejs', data) 
  
    }
  }

  const setmorning = async(context) => {
    const data = await getDatamorning(context);
    data.errors = validatemorning(data);
    let authenticated = await context.session.get('user');

    if (data.errors.length > 0) {
      data.user = authenticated.email;
      context.render("behaviourmorning.ejs", data);
  
    } else {

      const res = await executeQuery('SELECT * from morningbehaviour WHERE user_id=$1 AND dt=$2', authenticated.id, data.date);
      if (res && res.rowCount > 0) {
        await executeQuery('UPDATE morningbehaviour SET sleeptime=$1, sleepquality=$2, mood=$3 WHERE dt=$4 AND user_id=$5' , data.sleeptime, data.sleepquality, data.mood, data.date, authenticated.id);
        data.message = "Updated query on following date" + data.date
      } else {
        await executeQuery('INSERT INTO morningbehaviour (dt, sleeptime, sleepquality, mood, user_id) VALUES ($1, $2, $3, $4, $5);', data.date, data.sleeptime, data.sleepquality, data.mood, authenticated.id);
        data.message = "Added a new behaviour"
    }
      let d = await getDatamorning();
      d.user = authenticated.email;
      d.message = data.message;
      context.render("behaviourmorning.ejs", d);
    }
  };
  
  const setevening = async(context) => {
    const data = await getDataevening(context);
    data.errors = validateevening(data);
    let authenticated = await context.session.get('user');


    if (data.errors.length > 0) {
      data.user = authenticated.email;
      context.render("behaviourevening.ejs", data);
  
    } else {
      const res = await executeQuery('SELECT * from eveningbehaviour WHERE user_id=$1 AND dt=$2', authenticated.id, data.date);
      if (res && res.rowCount > 0) {
        await executeQuery('UPDATE eveningbehaviour SET sports=$1, study=$2, eatquality=$3, mood=$4 WHERE dt=$5 AND user_id=$6;', data.sports, data.study, data.eatquality, data.mood, data.date, authenticated.id);
        data.message = "Updated query on following date " + data.date
      } else {
        await executeQuery('INSERT INTO eveningbehaviour (dt, sports, study, eatquality, mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);', data.date, data.sports, data.study, data.eatquality, data.mood, authenticated.id);
        data.message = "Added a new behaviour"
    }
     
      let d = await getDataevening();
      d.user = authenticated.email;
      d.message = data.message;
      context.render("behaviourevening.ejs", d);
    }
  };

  const getdate = (today) => {
    var dd = String(today. getDate()). padStart(2, '0');
    var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    var yyyy = today. getFullYear();
    const day = yyyy + '-' + mm + '-' + dd;
    return day
}

  const getusersummary = async(context) => {
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
      email = 'not authenticated';
    } else {
      email = authenticated.email;
    }


    data.user = email;
    data.month = await getsummaryuser(authenticated.id, last30days, date);
    data.week = await getsummaryuser(authenticated.id, last7days, date);
    context.render('summary.ejs', data)
  }
  export {getmoods, getmorning, setmorning, getevening, setevening, getusersummary}