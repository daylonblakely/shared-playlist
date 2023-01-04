import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
// import { CreatePlaylistDto, UpdatePlaylistDto } from './dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SpotifyToken } from '../decorators/spotify-token.decorator';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPlaylist(
    @Body() createPlaylistDto,
    @SpotifyToken() token: string
  ) {
    return this.playlistService.create(token);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendPlaylistInvite(
    @Body() playlistInviteDto,
    @SpotifyToken() token: string
  ) {
    return this.playlistService.sendPlaylistInvite(token);
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
