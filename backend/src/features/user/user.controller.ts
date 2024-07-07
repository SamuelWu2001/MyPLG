import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiBody({ type: UserDto }) 
    @Post()
    async signUp(@Body() user: UserDto): Promise<User> {
        const duplicatedName = await this.userService.findUser(user.userName);
        const duplicatedEmail = await this.userService.findUserByEmail(user.email);
        if (duplicatedName) {
            throw new UnauthorizedException('用戶名已被註冊');
        }
        if (duplicatedEmail) {
            throw new UnauthorizedException('電子信箱已被註冊');
        }
        return this.userService.createUser(user);
    }

}
