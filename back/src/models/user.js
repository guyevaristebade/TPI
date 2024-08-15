import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
        name: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true,
        },
        permissions : {
          type: String,
          required: true,
          enum: ['administrator',"user" ],
          default: 'administrator'
        }
  },
  {
      timestamps : true
  }
)

export const User = mongoose.model('user',userSchema)
