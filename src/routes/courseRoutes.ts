
import express, { Request, Response } from "express"
import CourseController from "../controllers/CourseController"

const router = express.Router()
const controller = new CourseController()

router.get("/queryCourse/:name", async (req: Request, res: Response) => {
  const response = await controller.getByName(req.params.name, req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/queryCourse/:category", async (req: Request, res: Response) => {
  const response = await controller.getByCategory(req.params.name, req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

export default router