import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        'xxxxx',
      clientSecret: 'xxxxx',
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
