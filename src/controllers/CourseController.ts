import { Body, Get, Patch, Delete, Post, Route } from "tsoa"
import { CourseModel } from "../models/Course"
import { JsonObject } from "swagger-ui-express"

interface Course {
  name: string;
  category: string;
}

@Route("api/course")
export default class CourseController {

  list: Course[] = [{
    name: "JavaScript",
    category: "Frontend"
  }]

  @Post("/create")
  public async create(@Body() body: { name: string, category: string}): Promise<string> {
    const data = new CourseModel({
      name: body.name,
      category: body.category,
    })

    try {
      await data.save()
      return "OK"
    } catch (error) {
      return JSON.stringify(error)
    }
  }

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await CourseModel.find()
      return data
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  @Get("/queryCourse/:name")
  public async getByName(name: string, @Body() body: { name: string, category:string }): Promise<JsonObject> {
    try {
      const data = await CourseModel.find({ name }).select(
        "name -_id"
      );

      return data
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  @Get("/queryCourse/:category")
  public async getByCategory(category: string, @Body() body: { name: string, category:string }): Promise<JsonObject> {
    try {
      const data = await CourseModel.find({ category }).select(
        "category -_id"
      );

      return data
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

}
