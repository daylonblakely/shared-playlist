import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SpotifyWebApi from 'spotify-web-api-node';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PlaylistService {
  private readonly spotifyApi: SpotifyWebApi;

  constructor(
    @InjectModel(Playlist.name)
    private readonly playlistModel: Model<PlaylistDocument>,
    private readonly usersService: UsersService,
    private configService: ConfigService
  ) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: configService.get<string>('SPOTIFY_CALLBACK_URL'),
    });
  }

  async create(
    playlist: CreatePlaylistDto,
    userId,
    userAccessToken: string
  ): Promise<Playlist> {
    this.spotifyApi.setAccessToken(userAccessToken);

    // create the playlist
    const { body } = await this.spotifyApi.createPlaylist(playlist.name, {
      description: playlist.description,
      public: false, //public must be false for collaborative playlists
      collaborative: true,
    });

    // save playlist to db
    const createdPlaylist = await new this.playlistModel({
      name: body.name,
      spotifyId: body.id,
    }).save();

    // link to user
    await this.usersService.addPlaylist(userId, createdPlaylist._id);

    return createdPlaylist;
  }

  // async findAll(userId: string) {
  //   return this.playlistModel.find({user})
  // }

  //   async findOne(id: string, userAccessToken: string) {
  //     this.spotifyApi.setAccessToken(userAccessToken);

  //     // Get the playlist
  //     const playlistResponse = await this.spotifyApi.getPlaylist(id);
  //     return playlistResponse.body;
  //   }

  //   async update(
  //     id: string,
  //     updatePlaylistDto: UpdatePlaylistDto,
  //     userAccessToken: string
  //   ) {
  //     this.spotifyApi.setAccessToken(userAccessToken);

  //     // Update the playlist
  //     const updatePlaylistResponse = await this.spotifyApi.changePlaylistDetails(
  //       id,
  //       updatePlaylistDto.name,
  //       updatePlaylistDto.isPublic
  //     );
  //     return updatePlaylistResponse.body;
  //   }

  //   TODO - figure out how to delete playlists
  //   async remove(id: string, userAccessToken: string) {
  //
  //    this.spotifyApi.setAccessToken(userAccessToken);

  //     const removePlaylistResponse = ?
  //   }

  async sendPlaylistInvite(currentUser: string) {
    return currentUser;
  }
}
