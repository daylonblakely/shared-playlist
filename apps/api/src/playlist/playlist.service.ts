import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';

@Injectable()
export class PlaylistService {
  private readonly spotifyApi: SpotifyWebApi;

  constructor(private configService: ConfigService) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      redirectUri: configService.get<string>('SPOTIFY_CALLBACK_URL'),
    });
  }

  async create(userAccessToken: string) {
    this.spotifyApi.setAccessToken(userAccessToken);
    console.log(await this.spotifyApi.getMe());

    // // Create the playlist
    // const createPlaylistResponse = await this.spotifyApi.createPlaylist(
    //   userId,
    //   playlistName
    // );
    // return createPlaylistResponse.body;
  }
}
