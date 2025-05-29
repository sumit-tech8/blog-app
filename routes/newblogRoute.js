import express from "express";
import { deleteblogController, getSingleblogController, getblogsControlller, newblogsController, blogsPhotoController, searchblogsController, updateblogController } from "../controllers/blogscontrollers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable'


const router = express.Router();


//routes---------------------------------------------
//create new blogs
router.post(
  "/New-blogs",formidable(), newblogsController
);

//get photo
router.get("/blogs-photo/:pid", blogsPhotoController);

//get all blogs
router.get(
  "/get-blogs", getblogsControlller
);

//single note
router.get("/get-blog/:slug", getSingleblogController);

//delete notes
router.delete("/delete-blog/:id", deleteblogController);

//update category
router.put('/update-blog/:id', requireSignIn, updateblogController)

//search product
router.get("/search/:keyword", searchblogsController);


export default router; 