
const express = require ("express")
const router = express.Router();
const userRouter = require("./userRouter")
const accountRouter = require("./accountRouter")


router.use("/user",userRouter)
router.use("/account",accountRouter)

module.exports = router;

//  /api/v1/user/signin
//  /api/v1/user/signup
//  /api/v1/user/changePassword...

// /api/v1/account/transferMoney
// /api/v1/account/balance