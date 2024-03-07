var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api/logins');
}

// http://localhost:3000/api/logins/
const loginsRouter = require('./logins')
router.use('/logins', loginsRouter);

module.exports = router;