import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Password extends Document { 
  @Prop({ required: true })
  hash: string;  

  @Prop({ required: true })
  salt: string;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userName: string;
  
  @Prop({ type: Password, required: true })
  password: Password;
  
  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true })
  photo: number;
}

export const UserSchema = SchemaFactory.createForClass(User);