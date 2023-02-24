import { CollaborationsStatus } from '@collaborations/infra/typeorm/entities/collaboration.entity';
import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/inMemoryCollaborationsRepository';
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
      id: '1',
      collaboration_type_id: '1',
      collaborator_id: '1',
      academy_id: '1',
      status: CollaborationsStatus.pending,
      created_at: new Date(),
    };

    await expect(
      registerCollaborationUseCase.execute(collaboration),
    ).resolves.toEqual(collaboration);
  });
});
