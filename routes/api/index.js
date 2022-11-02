const router = require('express').Router();
const userRoutes = require('./user-route');
const thoughtRoutes = require('./thoughts-route');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
