import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 3,
    required: true
  },
  name: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

const ModelUser = mongoose.model('User', userSchema)

ModelUser.schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
    delete ret.password
  }
})

userSchema.plugin(uniqueValidator)

export default ModelUser