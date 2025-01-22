const express = require ("express")
const router = express.Router()
const zod = require("zod")
const {User,Account} = require ("../db")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config.js");  

const {authMiddleware} = require("../middleware.js")

// for input zod validation for signUp routes
const signUpSchema = zod.object({
    userName:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

router.post("/signup",async (req,res)=>{   
    // console.log(req.body);
    const body = req.body;

    const {success} = signUpSchema.safeParse(body)
    console.log("i am in backend signup")
    console.log(req.body);
    console.log(success)
    if(!success){
        return res.status(411).json({
    
            msg:" Incorrect input"
        })
    }
    // if success is true then we will find it in database as user  exist or not 
    
    const user =await User.findOne({
        username:body.userName
    })
    // if the user exists 
    console.log(user)
    if(user){
        console.log("email already taken")
        return res.status(411).json({
            message:"Email already taken "
        })
    }

    // if user does not exist create the user 
    console.log("creating the user: ")
    const dbUser = await User.create({
        username:req.body.userName,
        password:req.body.password,
        firstname:req.body.firstName,
        lastname:req.body.lastName,
    });
    console.log("user get created:")
    // create/ signed the  unque token for the all the user

    const userId = dbUser._id;

    // create a new account and give them some amount

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000,
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)


    res.json({
        message:"user created successfully",
        token:token,
    })

})

// input zod validation for signin routes

const signInSchema = zod.object({
    userName:zod.string().email(),
    password:zod.string(),
})

router.post("/signin",async (req,res)=>{
    const body = req.body;
    console.log(body.userName)
    console.log(body.password)
    const {success} = signInSchema.safeParse(body);
    
    if(!success){
        return res.status(411).json({
            message:"email already take / Incorrect input"
        })
    }

    const user = await User.findOne({
         username: req.body.userName,
         password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)

        return res.json({
            msg:"signin successfully",
            token:token
        })
    }

    res.status(411).json({
        msg:"error while login "
    })
})


// input zod validation for updateing information

const updateSchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

// here middleware is added to check it is valid user or not
router.put("/", authMiddleware, async (req, res) => {
    console.log("zod validation start")
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "error while updating information"
        });
    }
    
    console.log("zod validation clear")

    // Update the user's information by their userId
    const result = await User.updateOne(
        { _id: req.userId },  // Use userId (or _id) as the query filter
        { $set: req.body }    // Use $set to specify the fields to update
    );

    if (result.modifiedCount === 0) {
        return res.status(400).json({
            message: "No changes made or user not found"
        });
    }

    res.json({
        msg: "user updated successfully"
    });
});


// getting all other users

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            userName: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;