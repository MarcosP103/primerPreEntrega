import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.error('Error en la conexión', error)
        process.exit(1)
    }
}

export default connectDB