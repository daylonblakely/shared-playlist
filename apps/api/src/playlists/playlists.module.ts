import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistController } from './playlists.controller';
import { PlaylistService } from './playlists.service';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
