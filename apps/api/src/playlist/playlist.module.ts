import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
