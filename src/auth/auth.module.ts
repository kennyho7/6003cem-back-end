import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
@Module({
  imports: [PassportModule],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController], // Register the GoogleStrategy
})
export class AuthModule {}
