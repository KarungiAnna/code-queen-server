import { Router } from 'express';
import { homePage, cohortsPage, signupPage, createUser, 
 loginPage, 
  loginUser, forgotpasswordPage, forgotPassword, resetpasswordPage, resetPassword, studentProfile, adminDashboard,
fetchAllUsers } from '../controllers/UserControllers';
import isAuth from '../middleware/auth.js'


const router = Router();
//Home page route
  router.get("/homepage", homePage);
  router.get("/cohorts", cohortsPage);

// Users Registration/ signup Route
 router.get('/signup', signupPage);
 router.post('/signup', createUser);
  
  // Users Login Route
  router.get("/login", loginPage);
  router.post("/login", loginUser);

  // forgotpassword route
  router.get("/forgotpassword", forgotpasswordPage);
  router.post("/forgotpassword", forgotPassword);

  // resetpassword route
  router.get("/resetpassword/:token", resetpasswordPage);
  router.patch("/resetpassword/:token", resetPassword);
 
  // Profile Route
  router.get('/profile', isAuth, studentProfile);

  // Dashboard route
  router.get("/dashboard", isAuth, adminDashboard);

  // Fetch all users route
  router.get("/users", isAuth, fetchAllUsers);
  
export default router;

