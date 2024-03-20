var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api');
    console.log('ROUTE: /api/logins')
    console.log('ROUTE: /api/users')
}

router.get('/', (req, res) => {
    res.send('API Home Page');
});

// http://localhost:3000/api/logins/
const loginsRouter = require('./logins.js')
router.use('/logins', loginsRouter);

// http://localhost:3000/api/users/
const usersRouter = require('./users.js')
router.use('/users', usersRouter);

module.exports = router;