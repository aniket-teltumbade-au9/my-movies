
import { Injectable, ConflictException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './user.model';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { TokenResponse } from './dto/token-response.output';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { HashPasswordService } from '../HashPassword/hash-password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,

    private readonly hashPasswordService: HashPasswordService,

    private readonly jwtService: JwtService
  ) { }

  async register(registerUserInput: RegisterUserInput): Promise<User> {
    try {
      const password = await this.hashPasswordService.encrypt(registerUserInput.password)
      const userData = registerUserInput
      userData.password = password
      const user = await this.userModel.create(userData);

      return user;

    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email already exists');
      }

      if (error.name === 'ValidationError') {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }
  async login(loginUserInput: LoginUserInput): Promise<TokenResponse> {
    const { email, password } = loginUserInput;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashPasswordService.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY });

    return { accessToken, user };
  }
  async verify(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
      const user = await this.userModel.findById(payload.sub).exec();
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  async resumeToken(token: string): Promise<TokenResponse> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userModel.findById(payload.sub).exec();
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = { sub: user._id, email: user.email };
      const accessToken = this.jwtService.sign(newPayload, { secret: process.env.SECRET_KEY });

      return { accessToken, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

}