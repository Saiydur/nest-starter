export default class HttpUtils {
  static parseToken(req: any): string | null {
    try {
      const bearerToken = req.headers.authorization;
      const bearer = 'Bearer ';
      if (!bearerToken || !bearerToken.startsWith(bearer)) {
        return null;
      }
      return bearerToken.replace(bearer, '');
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static parseBearerToken(bearerToken: string): string | null {
    try {
      const bearer = 'Bearer ';
      if (!bearerToken || !bearerToken.startsWith(bearer)) {
        return null;
      }
      return bearerToken.replace(bearer, '');
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
