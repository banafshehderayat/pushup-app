import * as express from 'express';
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world');
});

exports.index = function(req, res){
  res.render('index', { title: 'ejs' });
};

module.exports = router;
