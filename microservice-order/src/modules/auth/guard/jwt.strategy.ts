import { PassportStrategy } from '@nestjs/passport';
// import { jwtConstants } from '../auth.constant';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { objectId } from 'src/common/type/objectId.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: objectId; email: string }) {
    const user = await this.authRepository.findById(
      payload.userId,
      '_id email role',
    );
    return user;
  }
}
