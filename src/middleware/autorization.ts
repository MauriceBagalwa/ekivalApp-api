import * as express from "express"
import { ROLES } from '../resources/users/user'

function role(request: express.Request, _role: ROLES) {
      const result: any = request
      const { role } = result.user
      return _role === role
}

function user(request: express.Request) {
      const result: any = request
      return result.user
}

export default { role, user }