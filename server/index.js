// Importing Env Variables for give codes
require("dotenv").config();

// libraries 
import express, { application } from "express";
import cors from "cors";
import helmet from "helmet";

import { BlogModel } from "./database/blog";

//mongodb Database connection
import ConnectDB from "./database/connection.js";

const blog = express();

// appplication middlewares
blog.use(express.json());
blog.use(express.urlencoded({ extended: false }));
blog.use(cors());
blog.use(helmet());

/*
Route     /a
Des       Get all blg
Params    none
Access    Public
Method    GET  
*/
blog.get("/a", async (req, res) => {
  try {
    const blog = await BlogModel.find();
    return res.json({ blog });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




/*
Route     /c
Des       Get all food based on particular category
Params    category
Access    Public
Method    GET  
*/
blog.get("/c/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const blog = await BlogModel.find({
        category: { $regex: category, $options: "i" },
      });
  
      return res.json({ blog });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });




  /*
Route     /:_title
Des       Get blog based on title
Params    _id
Access    Public
Method    GET  
*/
blog.get("/:_title", async (req, res) => {
    try {
      const { _title } = req.params;
      const Blog = await BlogModel.find({
        title: { $regex: _title, $options: "i" },
      });
  
      return res.json({ Blog });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });


/*
Route           /create/0357947589439079079375090239
Description     add new blog
Access          PUBLIC
Parameters      NONE
Method          POST
*/
blog.post("/new_/0357947589439079079375090239", (req, res) => {
    const { Blog } = req.body;
  
    BlogModel.create(Blog);
  
    return res.json({ message: "blog was added!" });
  });



const port = process.env.PORT || 4000;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}


blog.get("/", (req, res) => res.json({ message: "Setup success" }));

blog.listen(port, () =>
  ConnectDB()
    .then(() => console.log("Server is running "))
    .catch(() =>
      console.log("Server is running, but database connection failed... ")
    )
);
