import express from 'express';
import { displayrequests,approve,reject,logout,login,signup } from "../controller/moderatorauth.js";

const moderatorroute=express.Router();


moderatorroute.post("/signup",signup);
moderatorroute.post("/login",login);
moderatorroute.post("/logout",logout);
moderatorroute.get("/displayitems",displayrequests);
moderatorroute.post("/approve",approve);
moderatorroute.post("/reject",reject);

export default moderatorroute;