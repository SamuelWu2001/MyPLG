import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiProperty } from '@nestjs/swagger';

class LoginRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({ type: LoginRequest })
  @Post('login')
  async login(@Body() req: LoginRequest) {
    return this.authService.login(req.username, req.password);
  }
}