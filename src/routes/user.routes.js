// method kb run hho, kisi particular url pr , y url hta h routes

import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";

const router=Router()

router.route("/register").post(registeruser)


// y hga url hmara: users jo h router declaration m vo hmara prefix hga
// url: http://localhost:8000/api/v1/users/register

export default router