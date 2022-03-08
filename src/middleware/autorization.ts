import * as express from "express"
import { ROLES } from '../resources/users/user'

function admin(request: express.Request) {
      const result: any = request
      const { role } = result.user
      return role === ROLES.ADMIN
}

function allUserSystem(request: express.Request) {
      const result: any = request
      const { role } = result.user
      return role != ROLES.CUSTOMER
}

function user(request: express.Request) {
      const result: any = request
      const { _id } = result.user
      return _id
}

export default { admin, allUserSystem, user }