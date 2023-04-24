import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import SpotifyWebApi from 'spotify-web-api-node';
import { FindOnePlaylist } from '@spotify-app/types';
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
    userId: Types.ObjectId,
    userAccessToken: string
  ): Promise<FindOnePlaylist> {
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
      description: playlist.description,
      createdBy: userId,
    }).save();

    // link to user
    await this.usersService.addPlaylist(userId, createdPlaylist._id);

    return { ...createdPlaylist.toObject(), spotifyFields: body };
  }

  async findAll(userId: string): Promise<Playlist[]> {
    return this.playlistModel.find({ createdBy: userId }).exec();
  }

  async findOne(
    playlistId: string,
    userAccessToken: string
  ): Promise<FindOnePlaylist> {
    const playlist = await this.playlistModel.findById(
      new Types.ObjectId(playlistId)
    );

    if (!playlist) return undefined;

    const { spotifyId } = playlist;
    this.spotifyApi.setAccessToken(userAccessToken);

    const { body } = await this.spotifyApi.getPlaylist(spotifyId);

    return { ...playlist.toObject(), spotifyFields: body };
  }

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

  async remove(playlistId: string, userAccessToken: string) {
    // playlists need to be deleted manually off spotify
    const playlist = await this.playlistModel.findById(
      new Types.ObjectId(playlistId)
    );

    if (!playlist) return undefined;

    const { spotifyId } = playlist;
    this.spotifyApi.setAccessToken(userAccessToken);

    // set playlist to private (TODO: see if this removes other followers)
    // unfollow playlist, spotify api doesnt have delete
    await this.spotifyApi.changePlaylistDetails(spotifyId, { public: false });
    await this.spotifyApi.unfollowPlaylist(spotifyId);

    // delete playlist in db
    // middlware cascades delete to all user objects
    return this.playlistModel.findByIdAndDelete(playlistId).exec();
  }

  async sendPlaylistInvite(currentUser: string) {
    return currentUser;
  }
}
