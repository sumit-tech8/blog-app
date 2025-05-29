import express from 'express'
import { loginController, registerController, testController} from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'

//router object
const router = express.Router()



 
//Routing -------------------------------------

//REGISTER || METHOD POST
router.post('/register', registerController) 

// //get photo
// router.get("/login-photo/:pid", loginPhotoController);
  
//LOGIN || POST 
router.post('/login', loginController)

//test route
router.get('/test',requireSignIn,testController) 

// protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});


export default router;