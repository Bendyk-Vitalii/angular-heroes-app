export interface IUser {
  login?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface ServerResponse {
  response: string;
}

export interface Hero {
  _id: Object;
  name: string;
  slug: string;
  powerstats: powerstatsType;
  appearance: Object;
  biography: Object;
  connections: Object;
  id: Number;
  images: imageType;
  work: Object;
}

type powerstatsType = {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
};

type imageType = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
};
