import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  occupation: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  telephone: {
    required: true,
    type: String,
  }
})

export const AccountModel = mongoose.model("Account", accountSchema)
