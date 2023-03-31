import { RevokedToken } from '@auth/infra/typeorm/entities';
import { IRevokedTokenRepository } from '@auth/interfaces';

export class InMemoryRevokedTokenRepository implements IRevokedTokenRepository {
  revokedTokens: RevokedToken[] = [];

  async revokeToken(token: string): Promise<void> {
    const revokedToken: RevokedToken = new RevokedToken();
    revokedToken.token = token;

    this.revokedTokens.push(revokedToken);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = this.revokedTokens.find(
      (revokedToken) => revokedToken.token === token,
    );
    return !!revokedToken;
  }
}
