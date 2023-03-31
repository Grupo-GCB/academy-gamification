import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import { InMemoryRefreshTokenRepository } from '@auth/test/in-memory';
import { BusinessUnits, Roles } from '@shared/constants';
import { User } from '@users/infra/entities';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { Refresh } from '@auth/use-cases';

describe('Refresh', () => {
  let usersRepository: InMemoryUsersRepository;
  let jwtService: JwtService;
  let refreshTokenRepository: InMemoryRefreshTokenRepository;
  let refresh: Refresh;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    jwtService = new JwtService({ secret: 'test-secret' });
    refreshTokenRepository = new InMemoryRefreshTokenRepository();
    refresh = new Refresh(usersRepository, jwtService, refreshTokenRepository);
  });

  it('should refresh a valid token', async () => {
    const user: User = await usersRepository.create({
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: '',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const refreshToken = await refreshTokenRepository.createRefreshToken({
      user: user.id,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });

    const result = await refresh.execute(refreshToken.token);
    expect(result.accessToken).toBeDefined();
  });

  it('should throw UnauthorizedException when refreshToken is invalid', async () => {
    const invalidToken = 'invalidToken';
    await expect(refresh.execute(invalidToken)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when user is not found', async () => {
    const user: User = await usersRepository.create({
      name: 'Levi Ciarrochi',
      email: 'levi.ciarrochi@gcbinvestimentos.com',
      password: '',
      business_unit: BusinessUnits.ADIANTE,
      role: Roles.COLLABORATOR,
    });

    const refreshToken = await refreshTokenRepository.createRefreshToken({
      user: '603fcc7a-8860-4893-8397-66a0bb83f65f',
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });

    await expect(refresh.execute(refreshToken.token)).rejects.toThrow(
      BadRequestException,
    );
  });
});
