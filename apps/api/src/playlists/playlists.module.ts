import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistController } from './playlists.controller';
import { PlaylistService } from './playlists.service';
import { UsersService } from '../users/users.service';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Playlist.name,
        imports: [UsersModule],
        useFactory: (usersService: UsersService) => {
          const schema = PlaylistSchema;

          // cascade delete playlist from Users
          schema.post('findOneAndDelete', function (doc: Playlist) {
            usersService.removePlaylistFromUsers(doc._id);
          });

          return schema;
        },
        inject: [UsersService],
      },
    ]),
    UsersModule,
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
