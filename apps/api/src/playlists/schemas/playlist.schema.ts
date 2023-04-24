import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Playlist as IPlaylist } from '@spotify-app/types';
import { User } from '../../users/schemas/user.schema';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist implements IPlaylist {
  _id: Types.ObjectId;

  @Prop()
  spotifyId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
