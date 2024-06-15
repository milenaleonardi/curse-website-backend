import { Body, Get, Patch, Delete, Post, Route } from "tsoa"
import { AccountModel } from "../models/Account"
import { JsonObject } from "swagger-ui-express"

interface Account {
  name: string;
  occupation:string;
  email: string;
  telephone: string;
}

@Route("api/account")
export default class AccountController {

  list: Account[] = [{
    name: "admin",
    occupation: "admin",
    email: "admin@email.com",
    telephone: "4199999999",
  }]

  @Post("/create")
  public async create(@Body() body: { name: string, occupation: string, email: string, telephone: string}): Promise<string> {
    const data = new AccountModel({
      name: body.name,
      occupation: body.occupation,
      email: body.email,
      telephone: body.telephone
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
      const data = await AccountModel.find()
      return data
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  @Patch("/update")
  public async update(@Body() body: { name: string; occupation: string; email: string; telephone: string }): Promise<JsonObject> {
    try {
      const result = await AccountModel.findOneAndUpdate(
        { name: body.name }, // Filtro de consulta
        { email: body.email }, // Objeto de atualização
        { new: true } // Opção para retornar o documento atualizado
      );

      return { result: result }
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  @Patch("/update/:id")
  public async updateById(@Body() body: { name: string; occupation: string; email: string; telephone: string }, id: string): Promise<JsonObject> {
    try {
      const result = await AccountModel.findByIdAndUpdate(id, {
         name: body.name,  // Filtro de consulta
         occupation: body.occupation,
         email: body.email,
         telephone: body.telephone,  // Objeto de atualização
         new: true  // Opção para retornar o documento atualizado
      },
      );

      return { result: result }
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await AccountModel.findByIdAndDelete(id);
      return { data: data }
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  @Get("/queryAccount/:name")
  public async getByName(name: string, @Body() body: { name: string }): Promise<JsonObject> {
    try {
      const data = await AccountModel.find({ name }).select(
        "name -_id"
      );

      return data
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  // @Get("/account/:email")
  // public async getByEmail(name: string, @Body() body: {email: string}): Promise<JsonObject> {
  //   try {
  //     const data = await AccountModel.findOne({ email }).select(
  //       "email -_id"
  //     );

  //     return data
  //   } catch (error: any) {
  //     return {
  //       error: error.message,
  //     }
  //   }
  // }

}
