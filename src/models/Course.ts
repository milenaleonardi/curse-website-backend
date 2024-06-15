import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  }
})

export const CourseModel = mongoose.model("Course", courseSchema)
