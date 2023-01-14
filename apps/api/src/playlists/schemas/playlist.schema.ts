import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
  _id: Types.ObjectId;

  @Prop()
  spotifyId: string;

  @Prop()
  name: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
