import * as express from 'express';
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('All users here.');
});

module.exports = router;
