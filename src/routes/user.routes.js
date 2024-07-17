// method kb run hho, kisi particular url pr , y url hta h routes

import { Router } from "express";
import { loginuser, logoutuser, refreshAccessToken, registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(// response se pehle ek middleware lga lia upload ka aur hme multiple cheeze upload krni h toh fields lelia
    // aur hme do files chahie toh do objects lelie 
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverimage",
            maxCount:1

        }
    ]),
    registeruser
)

router.route("/login").post(loginuser)

// secured routes
router.route("/logout").post( verifyjwt,logoutuser)
router.route("/refresh-token").post(refreshAccessToken)
// verifyjwt middleware hai isko run hne ke baad logoutuser run hgaa and y islie hga kyuki hmne next() use kia tha jiska mtlb h middleware run hne k baad uske baad vala run krdo method


// y hga url hmara: users jo h router declaration m vo hmara prefix hga
// url: http://localhost:8000/api/v1/users/register

export default router