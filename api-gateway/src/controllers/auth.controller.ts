import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from 'src/dto/login-request.dto';
import { AuthService } from 'src/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { User } from 'common-modules';
import { RegisterDto } from 'src/dto/register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: Logger,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await firstValueFrom<User>(
      this.userServiceClient.send<User>('getUserByEmail', {
        email: loginDto.email,
      }),
    );
    if (
      !user ||
      !(await this.authService.isPasswordsMatching(
        user.password,
        loginDto.password,
      )) ||
      !user.isActive
    ) {
      throw new UnauthorizedException();
    }

    this.logger.log(`${user.name}(ID: ${user.id}) is logged into the system`);

    return {
      token: await this.authService.getToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.userType,
      },
    };
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await firstValueFrom<User>(
      this.userServiceClient.send<User>('getUserByEmail', {
        id: registerDto.email,
      }),
    );
    if (user) {
      throw new UnprocessableEntityException('User is already registered');
    }
    await this.userServiceClient
      .send<void>('createUser', {
        name: registerDto.name,
        email: registerDto.email,
        password: await this.authService.hashPassword(registerDto.password),
        userType: registerDto.userType,
      })
      .toPromise();
    return { isSuccess: true };
  }
}
