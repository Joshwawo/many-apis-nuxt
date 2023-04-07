import {connectDB} from '../config/config'
import BlogModel from '../models/blog'


export default defineEventHandler(async(event) => {
  await connectDB()
  const getBlogs = await BlogModel.find()

  return getBlogs
})
