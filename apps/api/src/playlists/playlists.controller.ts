import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SpotifyToken } from '../decorators/spotify-token.decorator';

@Controller('playlists')
@UseGuards(JwtAuthGuard)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async createPlaylist(
    @Req() req,
    @Body() createPlaylistDto: CreatePlaylistDto,
    @SpotifyToken() userAccessToken: string
  ) {
    return this.playlistService.create(
      createPlaylistDto,
      req.user.id,
      userAccessToken
    );
  }

  @Get()
  async findAll(@Req() req) {
    return this.playlistService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @SpotifyToken() userAccessToken: string
  ) {
    const playlist = await this.playlistService.findOne(id, userAccessToken);
    if (!playlist) throw new NotFoundException();
    return playlist;
  }

  //   @Put(':id')
  //   async update(@Param('id') id: string, @Body() updatePlaylistDto) {
  //     return this.playlistService.update(id, updatePlaylistDto);
  //   }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @SpotifyToken() userAccessToken: string
  ) {
    const playlist = await this.playlistService.remove(id, userAccessToken);
    if (!playlist) throw new NotFoundException();
    return playlist;
  }

  @Post('/sendInvite')
  async sendPlaylistInvite(
    @Req() req,
    @Body() playlistInviteDto,
    @SpotifyToken() userAccessToken: string
  ) {
    return this.playlistService.sendPlaylistInvite(req.user.displayName);
  }
}
