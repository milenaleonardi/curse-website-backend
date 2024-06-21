import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

import accountRoutes from "./routes/accountRoutes"
import courseRoutes from "./routes/courseRoutes"

import swaggerUi from "swagger-ui-express"
import { connect } from "./service/database"

dotenv.config()

const app: Express = express()

const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URL || ""

connect(databaseUrl)

const corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
 
app.use(cors(corsOptions)) 
app.use(express.json())
app.use(express.static("public"))
app.use(
  "/swagger", // endereço de onde o swagger responde
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)

app.use("/api/account", accountRoutes)
app.use("/api/course", courseRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Curse WebSite")
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})
