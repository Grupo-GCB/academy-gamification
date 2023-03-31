import { InMemoryRefreshTokenRepository } from '@auth/test/in-memory';
import { VerifyRefreshToken } from '@auth/use-cases';
import { BusinessUnits, Roles } from '@shared/constants';
import { User } from '@users/infra/entities';

describe('VerifyRefreshToken', () => {
  let inMemoryRefreshTokensRepository: InMemoryRefreshTokenRepository;
  let sut: VerifyRefreshToken;

  beforeEach(() => {
    inMemoryRefreshTokensRepository = new InMemoryRefreshTokenRepository();
    sut = new VerifyRefreshToken(inMemoryRefreshTokensRepository);
  });

  it('should be able to verify if refresh token exists', async () => {
    const user: User = {
      id: 'aa901e87-c941-419e-8e4d-43fe75998a1e',
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'gcb123',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    };

    const expiresAt: number = 2880 * 60000;

    const token = await inMemoryRefreshTokensRepository.createRefreshToken({
      user: user.id,
      expiresAt,
    });

    const verifyToken = await sut.execute(token.token);

    expect(verifyToken).toBeTruthy();
  });

  it('should be able to verify if refresh token does not exists', async () => {
    const verifyToken = await sut.execute(
      '34e6aede-ba4f-4412-a354-88b944c73dde',
    );

    expect(verifyToken).toBeFalsy();
  });
});
