import { Router } from "express";
import {  AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewires/checkAuth";


const router = Router()


router.post("/login", AuthControllers.credentialsLogin)
router.post("/logout", AuthControllers.logout)
// router.get("/me", checkAuth("admin", "user"), AuthController.me);


export const AuthRoutes = router;