import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { User } from 'common-modules';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('APP_KEY'),
    });
  }

  async validate(payload: { userId: string }) {
    const loggedUser = await firstValueFrom(
      this.userServiceClient.send<User>('getUserById', {
        id: payload.userId,
      }),
    );

    if (loggedUser) {
      return loggedUser;
    }

    throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}
