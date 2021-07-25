import { User } from "./entities/User";
import { sign } from "jsonwebtoken";

export const generateAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!);
};
