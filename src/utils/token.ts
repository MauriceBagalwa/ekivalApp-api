import { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import IToken from './interfaces/token.interface'
import { IUserType } from '../resources/users/user'

export const createToken = (user: Schema.Types.ObjectId, role: string): string => {
      return jwt.sign({ _id: user, role }, `${process.env.SECRETJWT}`, {
            expiresIn: '1d'
      })
}

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
      return new Promise((resolve, reject) => {
            jwt.verify(token, "secret", (err, payload) => {
                  if (err) return reject(err)
                  resolve(payload as IToken)
            })
      })
}

export default { createToken, verifyToken }