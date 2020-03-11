import {
  Resolver,
  Mutation,
  Query,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "hell yeah!";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
