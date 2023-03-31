import { JwtService } from '@nestjs/jwt';

import { BusinessUnits, Roles } from '@shared/constants';
import { Login } from '@auth/use-cases/';
import { InMemoryRefreshTokenRepository } from '@auth/test/in-memory';
import { User } from '@users/infra/entities';

describe('Login', () => {
  let jwtService: JwtService;
  let inMemoryRefreshTokenRepository: InMemoryRefreshTokenRepository;
  let sut: Login;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn().mockReturnValue('validToken'),
      verify: jest.fn().mockImplementation((token) => {
        if (token !== 'validToken') {
          throw new Error('Invalid token');
        }
      }),
    } as any;

    inMemoryRefreshTokenRepository = new InMemoryRefreshTokenRepository();

    sut = new Login(jwtService, inMemoryRefreshTokenRepository);
  });

  it('should generate an access token and a refresh token for a user', async () => {
    const user: User = {
      id: '64f14229-9013-4a5d-be03-5e8261e65fe4',
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: 'hashedPassword',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    };

    const userToken = await sut.execute(user);

    const storedRefreshToken =
      await inMemoryRefreshTokenRepository.findRefreshToken(
        userToken.refreshToken,
      );

    expect(storedRefreshToken).toBeDefined();
    expect(storedRefreshToken.user).toEqual(user.id);
    expect(userToken).toHaveProperty('accessToken');
    expect(userToken).toHaveProperty('refreshToken');
  });
});
