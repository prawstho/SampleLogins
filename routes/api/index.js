var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api');
}

router.get('/', (req, res) => {
    res.render('apihome');
});

// http://localhost:3000/api/logins/
const loginsRouter = require('./logins.js')
router.use('/logins', loginsRouter);

// http://localhost:3000/api/users/
const usersRouter = require('./users.js')
router.use('/users', usersRouter);

module.exports = router;