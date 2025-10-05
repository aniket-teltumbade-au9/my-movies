
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { TokenResponse } from './dto/token-response.output';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => User, { description: 'Create a new user' })
    async registerUser(
        @Args('registerUserInput') registerUserInput: RegisterUserInput,
    ): Promise<User> {
        return this.userService.register(registerUserInput);
    }

    @Mutation(() => TokenResponse, { description: 'Login a user' })
    async loginUser(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
    ): Promise<TokenResponse> {
        return this.userService.login(loginUserInput);
    }

    @Query(() => User, { description: 'Verify a JWT token' })
    async verifyToken(
        @Args('token') token: string,
    ): Promise<User> {
        return this.userService.verify(token);
    }

    @Mutation(() => TokenResponse, { description: 'Resume session with token' })
    async resumeToken(
        @Args('token') token: string,
    ): Promise<TokenResponse> {
        return this.userService.resumeToken(token);
    }

}
