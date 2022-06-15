import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto/auth.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: SignupDto) {
    return this.authService.signUp(user);
  }

  @Post('/login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // req.user;
    const data = await this.authService.login(user.email, user.password);
    res.cookie('accessToken', data.accessToken, { httpOnly: true });
    return data;
  }
}
