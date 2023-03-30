import { SendGridService } from '@anchan828/nest-sendgrid';
import { MailService } from '@sendgrid/mail';
import { BusinessUnits } from '@shared/constants';
import { InMemoryUsersRepository } from '@users/test/in-memory';
import { RegisterUser } from '@users/use-cases';

jest.mock('@anchan828/nest-sendgrid', () => {
  return {
    SendGridService: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => Promise.resolve()),
        mailService: new MailService(),
      };
    }),
  };
});

describe('Register user', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: RegisterUser;
  let sendGridMock: SendGridService;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sendGridMock = new SendGridService(
      { apikey: 'fake-api-key' },
      new MailService(),
    );
    sut = new RegisterUser(inMemoryUsersRepository, sendGridMock);
  });

  it('should be able to register an user', async () => {
    const user = await sut.execute({
      email: 'gustavo.wuelta@gcbinvestimentos.com',
      business_unit: BusinessUnits.ADIANTE,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: 'gustavo.wuelta@gcbinvestimentos.com',
        password: user.password,
        business_unit: BusinessUnits.ADIANTE,
        role: user.role,
      }),
    );
  });

  it('should not be able to register an user if invalid email is passed', async () => {
    await expect(
      sut.execute({
        email: 'gustavo.wuelta@gmail.com',
        business_unit: BusinessUnits.ADIANTE,
      }),
    ).rejects.toThrow('E-mail inválido!');
  });
});
