import {
  Arg,
  Resolver,
  Query,
  Mutation,
  Field,
  ObjectType,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entities/User";
import { generateAccessToken } from "../auth";
import validate from "../utils/password-validator";
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
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect username or password");

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
}
