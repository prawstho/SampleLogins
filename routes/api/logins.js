var router = require('express').Router();
const loginsDal = require('../../services/pg.logins.dal') // Import the DAL page pg.logins.dal.js

// api/logins
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/logins/ GET ' + req.url);
    try {
        let theLogins = await loginsDal.getLogins(); 
        res.json(theLogins);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }

    
});

module.exports = router;