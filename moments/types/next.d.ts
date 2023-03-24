import { JwtPayload } from 'jsonwebtoken'
import { IncomingMessage } from 'http'

declare module 'next' {
  namespace Express {
    interface User extends JwtPayload {}
  }

  export interface NextApiRequest extends IncomingMessage {
    user?: Express.User
  }
}
