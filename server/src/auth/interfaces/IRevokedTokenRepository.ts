export abstract class IRevokedTokenRepository {
  abstract revokeToken(token: string): Promise<void>;

  abstract isTokenRevoked(token: string): Promise<boolean>;
}
