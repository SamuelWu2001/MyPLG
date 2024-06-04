import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class News extends Document {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    imgUrl: string;

    @Prop()
    publishedAt: string;

    @Prop()
    tag: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);