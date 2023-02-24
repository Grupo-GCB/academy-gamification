import { RegisterCollaborationUseCase } from './register-collaboration';

describe('Register a Collaboration', () => {
  let collaborationsRepository: InMemoryCollaborationsRepository;

  let registerCollaborationUseCase: RegisterCollaborationUseCase;

  beforeEach(() => {
    collaborationsRepository = new InMemoryCollaborationsRepository();

    registerCollaborationUseCase = new RegisterCollaborationUseCase(
      collaborationsRepository,
    );
  });

  it('should be able to register a Collaboration', async () => {
    const collaboration = {
      collaborator: 'Flávio',
      academyHelped: 'Gustavo',
      description: 'Ajudou com dúvidas sobre arquitetura',
    };

    expect(registerCollaborationUseCase.execute(collaboration)).toEqual(
      collaboration,
    );
  });
});
