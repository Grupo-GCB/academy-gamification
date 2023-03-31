import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

import { Logout } from '@auth/use-cases';
import { InMemoryRevokedTokenRepository } from '@auth/test/in-memory/';

describe('Logout', () => {
  let jwtService: JwtService;
  let revokedTokenRepository: InMemoryRevokedTokenRepository;
  let sut: Logout;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn().mockReturnValue('validToken'),
      verify: jest.fn().mockImplementation((token) => {
        if (token !== 'validToken') {
          throw new Error('Invalid token');
        }
      }),
    } as any;
    revokedTokenRepository = new InMemoryRevokedTokenRepository();
    sut = new Logout(jwtService, revokedTokenRepository);
  });

  it('should revoke a valid token and not throw an error', async () => {
    const token = jwtService.sign({
      sub: '5c979dcb-e8f9-4996-b31b-f7cf34d4de1a',
      email: 'vitor.freitas@gcbinvestimentos.com',
    });
    await expect(async () => {
      await sut.execute(token);
    }).not.toThrow();

    const isTokenRevoked = await revokedTokenRepository.isTokenRevoked(token);
    expect(isTokenRevoked).toBeTruthy();
  });

  it('should throw a error when token is invalid', async () => {
    const invalidToken = 'invalidToken';

    await expect(async () => {
      await sut.execute(invalidToken);
    }).rejects.toThrow(new UnauthorizedException('Token inválido!'));
  });
});
