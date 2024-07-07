import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CommonUtility } from 'src/core/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUser(username);
    if (!user) {
      throw new UnauthorizedException('用戶名或密碼不正確');
    }

    const { hash } = CommonUtility.encryptBySalt(password, user.password.salt);
    if (hash !== user.password.hash) {
      throw new UnauthorizedException('用戶名或密碼不正確');
    }
    const payload = { username: user.userName, sub: user._id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
