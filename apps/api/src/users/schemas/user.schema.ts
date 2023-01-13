import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Playlist } from '../../playlists/schemas/playlist.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: mongoose.ObjectId;

  @Prop({ required: true, unique: true })
  spotifyId: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  playlists: Playlist[];
}

export const UserSchema = SchemaFactory.createForClass(User);
