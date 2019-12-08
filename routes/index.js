const router = require('express').Router();
const user = require('./users');
const articles = require('./articles');
const wrongpage = require('./wrongpage');

router.use('/users', user);
router.use('/articles', articles);
router.use(wrongpage);

module.exports = router;
