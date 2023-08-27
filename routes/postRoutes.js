const express = require('express');
const authController = require('../controller/PostJobController');
const { verifyToken } = require('../utils/jwt');
const router = express.Router()

router.post('/createpost',verifyToken,authController.CreateJob)
// router.post('/login',authController.login)
router.get('/getJobs',verifyToken,authController.getJobs)


module.exports = router;