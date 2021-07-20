import { Arg, Resolver, Query, Mutation } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => String)
  welcome() {
    return "Welcome!";
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
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
