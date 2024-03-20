var router = require('express').Router();
const usersDal = require('../../services/m.users.dal')

// api/users - GET a list of all users
router.get('/', async (req, res) => {
  if(DEBUG) console.log('REQUEST: /api/users/ GET ' + req.url);
  // try catch lets us try some code we thing will work and if it does - GOOD.
  // otherwise catch and deal with the failure
  try {
    // get data from the data storage
    let theUsers = await usersDal.getUsers(); 
    // send the fetched data to the internet as a JSON structure
    res.json(theUsers);
  } catch {
    // log this error to an event log file.
    // at this point it is a low in the fullstack server error
    res.statusCode = 503;
    // also send a message back to you API consumer
    res.json({message: "Service Unavailable", status: 503});
  }
});

// api/users/:id - GET a single user
router.get('/:id', async (req, res) => {
  if(DEBUG) console.log('REQUEST: /api/users/:id GET ' + req.url);
  // make sure we send data back to the browser
  res.send('REQUEST: /api/users/:id GET ' + req.url)
});

module.exports = router;