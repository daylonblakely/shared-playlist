import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SpotifyWebApi from 'spotify-web-api-node';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';

@Injectable()
export class PlaylistService {
  private readonly spotifyApi: SpotifyWebApi;

  constructor(
    @InjectModel(Playlist.name)
    private readonly playlistModel: Model<PlaylistDocument>,
    private configService: ConfigService
  ) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: configService.get<string>('SPOTIFY_CALLBACK_URL'),
    });
  }

  async create(playlist: CreatePlaylistDto, userAccessToken: string) {
    this.spotifyApi.setAccessToken(userAccessToken);
    console.log(await this.spotifyApi.getMe());

    // create the playlist
    const { body } = await this.spotifyApi.createPlaylist(playlist.name, {
      description: playlist.description,
      public: true,
    });

    // save playlist to db and link to user
    const createdPlaylist = new this.playlistModel({
      name: body.name,
      spotifyId: body.id,
    });

    return createdPlaylist.save();
  }

  //   async findAll(userAccessToken: string) {
  //     // Get the user's access toke
  //     this.spotifyApi.setAccessToken(userAccessToken);

  //     // Get the user's playlists
  //     const userPlaylistsResponse = await this.spotifyApi.getUserPlaylists(
  //       createPlaylistDto.userId
  //     );
  //     return userPlaylistsResponse.body;
  //   }

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
