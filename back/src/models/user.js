import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema(
  {
        name: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        password: {
          type: String,
          required: true,
          minlength: 6,
          trim: true,
        },
        role : {
          type: String,
          enum: ['Admin', 'Agent'],
          default: 'Agent'
        },
        lastLogin: {
          type: Date,
          default: Date.now()
        }
  },
  {
      timestamps : true
  }
)

export const User = mongoose.model('User',userSchema)
