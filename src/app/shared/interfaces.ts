export interface User {
  login?: string,
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

// export interface FireBaseAuthResponse {
//   idToken: string;
//   expiresIn: string;
// }

export interface Hero {
  appearance: Object,
biography: Object,
connections: Object,
id: string,
image: any,
name: string,
powerstats: any,
work: Object
}
