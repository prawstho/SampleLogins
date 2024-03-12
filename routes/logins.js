const express = require('express');
const router = express.Router();
const loginsDal = require('../services/pg.logins.dal')

router.get('/', async (req, res) => {
  // const theLogins = [
  //     {id: 1, username: 'example', password: 'example'},
  //     {id: 4, username: 'frodob', password: 'example'},
  //     {id: 7, username: 'bilbob', password: 'example'}
  // ];
  try {
     let theLogins = await loginsDal.getLogins(); 
      if(DEBUG) console.table(theLogins);
      res.render('logins', {theLogins});
  } catch {
      res.render('503');
  }
});

router.post('/', async (req, res) => {
  if(DEBUG) console.log("logins.POST");
  try {
      await loginsDal.addLogin(req.body.username, req.body.password);
      res.redirect('/logins/');
  } catch (err){
      if(DEBUG) console.log(err);
      // log this error to an error log file.
      res.render('503');
  } 
});

module.exports = router