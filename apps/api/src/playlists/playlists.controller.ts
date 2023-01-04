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
} from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SpotifyToken } from '../decorators/spotify-token.decorator';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPlaylist(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @SpotifyToken() userAccessToken: string
  ) {
    return this.playlistService.create(createPlaylistDto, userAccessToken);
  }

  @Post('/sendInvite')
  @UseGuards(JwtAuthGuard)
  async sendPlaylistInvite(
    @Req() req,
    @Body() playlistInviteDto,
    @SpotifyToken() userAccessToken: string
  ) {
    return this.playlistService.sendPlaylistInvite(req.user.displayName);
  }

  //   @Get()
  //   async findAll() {
  //     return this.playlistService.findAll();
  //   }

  //   @Get(':id')
  //   async findOne(@Param('id') id: string) {
  //     return this.playlistService.findOne(id);
  //   }

  //   @Put(':id')
  //   async update(@Param('id') id: string, @Body() updatePlaylistDto) {
  //     return this.playlistService.update(id, updatePlaylistDto);
  //   }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     return this.playlistService.remove(id);
  //   }
}
