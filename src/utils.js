import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcryptjs'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
export const createHash = password => bcrypt.hashSync( password, bcrypt.genSaltSync(10) )

export const isValidPassword = async (user, password) => { await bcrypt.compare(user.password, password)};