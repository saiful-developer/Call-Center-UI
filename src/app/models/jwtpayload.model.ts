export interface JwtPayload {
  autoid: number;
  name: string;
  loginid: string;
  extension: number;
  usertype: string;
  sessionid: string;
  info: string;
  iat: number;
  exp: number;
}
