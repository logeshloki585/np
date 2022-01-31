import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    category : {type : String, required :true},
    title :{type : String, required :true},
    us_url:{type : String, required :true},
    s_url:{type : String, required :true},
    pass_one:{type : String, required :true},
    pass_two:{type : String, required :true},
    pass_three:{type : String, required :true}
  },
  {
    timestamps: true,
  }
);

export const BlogModel = mongoose.model("Blog", BlogSchema);
