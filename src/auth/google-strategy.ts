import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '116867108991-rj239vhe5h5ub20ue95864pq1mnrembr.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const user = {
      googleId: id,
      displayName,
      email: emails[0].value,
      photo: photos[0].value,
      accessToken,
      refreshToken,
    };

    // Pass the user data to the callback function
    done(null, user);
  }
}
