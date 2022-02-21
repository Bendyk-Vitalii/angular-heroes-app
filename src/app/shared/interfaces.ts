export interface User {
  login?: string,
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FireBaseAuthResponse {
  idToken: string;
  expiresIn: string;
}
