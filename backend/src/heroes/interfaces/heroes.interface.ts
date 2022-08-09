import { Document, ObjectId } from 'mongoose';

export interface HeroesInterface extends Document {
  _id: ObjectId;
  name: string;
  slug: String;
  powerstats: powerstatsType;
  appearance: Object;
  biography: Object;
  connections: Object;
  id: Number;
  images: imageType;
  work: Object;
}

type powerstatsType = {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
};

type imageType = {
  xs: String;
  sm: String;
  md: String;
  lg: String;
};
