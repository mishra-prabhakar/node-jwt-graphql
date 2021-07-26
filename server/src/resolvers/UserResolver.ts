import {
  Arg,
  Resolver,
  Query,
  Mutation,
  Field,
  ObjectType,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entities/User";
import { generateAccessToken, generateRefreshToken } from "../auth";
import validate from "../utils/password-validator";
import { verify } from "jsonwebtoken";
import { UserContext } from "../userContext";
import { isAuth } from "../isAuth";
@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}
@Resolver()
export class UserResolver {
  @Query(() => String)
  welcome() {
    return "Welcome!";
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: UserContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect username or password");

    const token = generateRefreshToken(user);
    res.cookie("jid", token, {
      httpOnly: true,
      path: "/",
    });

    return {
      accessToken: generateAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const passwordOptions = { minLength: 8, letters: true, digits: true };
    const { valid } = validate(password, passwordOptions);
    if (!valid) {
      throw new Error(
        "Password must be 8 characters with atleast one number and one character"
      );
    }
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  User(@Ctx() context: UserContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: UserContext) {
    res.cookie("jid", "", {
      httpOnly: true,
      path: "/",
    });

    return true;
  }
}
