export interface IUser {
  name: string;
  password: string;
  uid?: string;
  email: string;
  expirationDate: Date;
  photoURL?: string;
  displayName?: string;
  emailVerified?: boolean;
}

export interface AuthData {
  accessToken: string;
  email?: string;
  iat: number; //Expiring at timestamp
  exp: number;
  id: number;
}

export interface UserCredentials {
  login: string;
  email: string;
  password: string;
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
