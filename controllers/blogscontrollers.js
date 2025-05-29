
import newblogsmodel from '../models/newblogsmodel.js'
import slugify from 'slugify'
import fs from 'fs'


//POST NEW BLOG ----------------------------------------------------
export const newblogsController = async (req, res) => {
    try {
      const { title,slug,discription } = req.fields;
        const {photo} = req.files;
      //validation
      switch (true) {
        case !title:
          return res.status(500).send({ error: "title is Required" });
        case !discription:
          return res.status(500).send({ error: "Description is Required" });
      }
  
      const newblogs = new newblogsmodel({...req.fields, slug:slugify(title)});
      if (photo) {
        newblogs.photo.data = fs.readFileSync(photo.path);
        newblogs.photo.contentType = photo.type;
      }
      await newblogs.save();
      res.status(201).send({
        success: true,
        message: "newblogs Created Successfully",
        newblogs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing blogs",
      });
    }
  };

// export const newnotesController = async (req, res) => {
//   try {
//     const { title,slug,discription } =
//       req.body;
//     //validation
//     switch (true) {
//       case !title:
//         return res.status(500).send({ error: "title is Required" });
//       case !discription:
//         return res.status(500).send({ error: "Description is Required" });
//     }

//     const newnotes = await new newnotesmodel({...req.body, slug: slugify(title)}).save();
//     res.status(201).send({
//       success: true,
//       message: "newnotes Created Successfully",
//       newnotes,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in crearing notes",
//     });
//   }
// };



   // get all blog ---------------------------------------------
   export const getblogsControlller = async (req, res) => {
    try {
      const blogs = await newblogsmodel.find({})
      res.status(200).send({
        success: true,
        message: "All blogs List",
        blogs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all blogs",
      });
    }
  };

  // get photo  ----------------------------------------------------
export const blogsPhotoController = async (req, res) => {
  try {
    const newblog = await newblogsmodel.findById(req.params.pid).select("photo");
    if (newblog.photo.data) {
      res.set("Content-type", newblog.photo.contentType);
      return res.status(200).send(newblog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

  // get single blog  ----------------------------------------
export const getSingleblogController = async (req, res) => {
  try {
    
    const blog = await newblogsmodel
      .findOne({ slug:req.params.slug })
    res.status(200).send({
      success: true,
      message: "Single blog Fetched",
      blog,
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single blog",
      error,
    });
  }
};

  //delete controller --------------------------------------
export const deleteblogController = async (req, res) => {
  try {
    const {id} = req.params;
    await newblogsmodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};


//update blog  -----------------------------------------------------
export const updateblogController = async (req, res) => {
  try {
    const { title,discription,Color } = req.body;
    const { id } = req.params;
    const blogg = await newblogsmodel.findByIdAndUpdate(
      id,
      { title, slug: slugify(title),discription,Color },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "blog Updated Successfully",
      blogg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating blog",
    });
  }
};


// search blog  -------------------------------------------------------
export const searchblogsController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await newblogsmodel
      .find({
        $or: [
          { title:{ $regex: keyword, $options: "i" } },
        ],
      })
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search blog API",
       error,
      });
    }
};