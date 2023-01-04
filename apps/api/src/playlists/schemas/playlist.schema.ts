import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
  @Prop()
  id: string;

  @Prop()
  spotifyId: string;

  @Prop()
  name: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
