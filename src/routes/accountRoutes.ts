import express, { Request, Response } from "express"
import AccountController from "../controllers/AccountController"

const router = express.Router()
const controller = new AccountController()

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(response === "OK" ? 200 : 400).send(response)
})

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.patch("/update/:id", async (req: Request, res: Response) => {
  const response = await controller.update(req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.name)

  return res.status(response.error ? 400 : 200).send(response)
})

//router.get("/getToppings", async (req: Request, res: Response) => {
  //const response = await controller.allToppings()

  //return res.status(response.error ? 400 : 200).send(response)
//})

router.get("/queryAccount/:name", async (req: Request, res: Response) => {
  const response = await controller.getByName(req.params.name, req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

// router.get("/fields", async (req: Request, res: Response) => {
//   const response = await controller.fields()

//   return res.status(response.error ? 400 : 200).send(response)
// })

export default router
