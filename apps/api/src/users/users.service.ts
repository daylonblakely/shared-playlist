import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneBySpotifyId(spotifyId: string): Promise<User> {
    return this.userModel.findOne({ spotifyId }).exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    return new this.userModel({
      spotifyId: user.spotifyId,
      displayName: user.displayName,
      email: user.email,
      playlists: [],
    }).save();
  }
}
