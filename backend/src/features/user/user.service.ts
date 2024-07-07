import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { UserDto, UserWithHashDto } from './user.dto';
import { CommonUtility } from 'src/core/common';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(userDto: UserDto): Promise<User> {
        const { hash, salt } = CommonUtility.encryptBySalt(userDto.password);
        const userWithHashDto : UserWithHashDto = {
            userName: userDto.userName,
            password: {
                hash: hash,
                salt: salt
            },
            email: userDto.email,
            photo: userDto.photo
        };
        const createdNews = new this.userModel(userWithHashDto);
        return createdNews.save();
    };



    async findUser(userName: string): Promise<User> {
        return this.userModel.findOne({ 'userName': userName }).exec();
    };

    async findUserByID(id: string): Promise<User> {
        return this.userModel.findOne({ '_id': id }).exec();
    };

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ 'email': email }).exec();
    };


}
