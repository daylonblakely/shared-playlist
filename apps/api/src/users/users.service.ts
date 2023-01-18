import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneBySpotifyId(spotifyId: string): Promise<User> {
    return this.userModel.findOne({ spotifyId }).exec();
  }

  async addPlaylist(
    userId: Types.ObjectId,
    playlistId: Types.ObjectId
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, {
      $push: { playlists: playlistId },
    });
  }

  async removePlaylistFromUsers(playlistId: Types.ObjectId) {
    return this.userModel
      .updateMany(
        { playlists: { $in: [playlistId] } },
        { $pull: { playlists: playlistId } }
      )
      .exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      spotifyId: user.spotifyId,
      displayName: user.displayName,
      email: user.email,
      playlists: [],
    });
    return newUser.save();
  }
}
