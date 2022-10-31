export interface AuthData {
  accessToken: string;
  /**
   * Admin ID in MySQL
   */
  id: number;
  iat: number;
  /**
   * Expiring at timestamp
   */
  exp: number;
}

export interface AuthServerResponse {
  access_token: string;
}
