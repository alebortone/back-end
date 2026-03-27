import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../passport_jwt/local-auth.guard';
import { JwtAuthGuard } from '../passport_jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  
}
