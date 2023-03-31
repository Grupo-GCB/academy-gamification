import { RefreshTokenDTO } from '@auth/dto';
import { RefreshToken } from '@auth/infra/typeorm/entities';
export abstract class IRefreshTokenRepository {
  abstract createRefreshToken({
    user,
    expiresAt,
  }: RefreshTokenDTO): Promise<RefreshToken>;

  abstract findRefreshToken(token: string): Promise<RefreshToken>;

  abstract revokeRefreshToken(token: string): Promise<void>;
}
