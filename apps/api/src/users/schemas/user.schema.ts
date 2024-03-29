import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User as IUser } from '@spotify-app/types';
import { Playlist } from '../../playlists/schemas/playlist.schema';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  _id: Types.ObjectId;

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
