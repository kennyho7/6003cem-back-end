import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // This will initiate the Google OAuth2 authentication flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback() {
    // This will handle the callback after authentication
  }
}
