import { User } from "src/user/entities/user.entity";

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: number; email: string; userStuNum: number; };
  }
}
