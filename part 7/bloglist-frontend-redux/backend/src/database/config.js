import mongoose from 'mongoose'

export const initDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log('💾 database conneted!')
  } catch (error) {
    console.error(error.message)
  }
}