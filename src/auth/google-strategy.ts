import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '116867108991-rj239vhe5h5ub20ue95864pq1mnrembr.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      //scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    // Implement your validation logic here
    // You can access the user's profile information through the 'profile' parameter
    // Perform any necessary checks, database queries, or validations
    // Return the validated user object or throw an UnauthorizedException if validation fails

    const authUserDto: AuthUserDto = {
      username: profile.emails[0].value,
      password: '', // Set the password field based on your validation logic
    
    };

    const user = await this.authService.validateUserCredentials(authUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
