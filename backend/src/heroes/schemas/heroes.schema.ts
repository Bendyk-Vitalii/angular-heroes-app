import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type HeroesDocument = Heroes & Document;

@Schema()
export class Heroes {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop({ type: Object })
  appearance: object;

  @Prop({ type: Object })
  biography: object;

  @Prop({ type: Object })
  connections: object;

  @Prop()
  id: number;

  @Prop({ type: Object })
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };

  @Prop({ type: Object })
  powerstats: {
    intelligence: Number;
    strength: Number;
    speed: Number;
    durability: Number;
    power: Number;
    combat: Number;
  };

  @Prop({ type: Object })
  work: object;
}

export const HeroesSchema = SchemaFactory.createForClass(Heroes);
