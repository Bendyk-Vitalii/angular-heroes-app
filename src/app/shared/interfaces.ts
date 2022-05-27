export interface User {
  login?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface Hero {
  appearance: Object;
  biography: Object;
  connections: Object;
  id: string;
  image: any;
  name: string;
  powerstats: any;
  work: Object;
}

export interface ServerResponse {
  response: String;
  results: Array<Hero>;
}
