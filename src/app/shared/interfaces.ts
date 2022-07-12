export interface User {
  login?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface ServerResponse {
  response: String;
}

export interface Hero {
  _id: Object;
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
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
};

type imageType = {
  xs: String;
  sm: String;
  md: String;
  lg: String;
};
