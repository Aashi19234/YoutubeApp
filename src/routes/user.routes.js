// method kb run hho, kisi particular url pr , y url hta h routes

import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


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


// y hga url hmara: users jo h router declaration m vo hmara prefix hga
// url: http://localhost:8000/api/v1/users/register

export default router