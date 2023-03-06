import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
} from '@shared/constants';
import { RegisterCollaboration } from './register-collaboration';

describe('Register a collaboration', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;

  let sut: RegisterCollaboration;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();

    sut = new RegisterCollaboration(inMemoryCollaborationsRepository);
  });

  it('should be able to register a collaboration', async () => {
    const collaboration = await sut.execute({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: '1',
      status: CollaborationsStatus.PENDING,
      business_unit: BusinessUnits.ADIANTE,
    });

    expect(collaboration).toEqual(
      expect.objectContaining({
        type: CollaborationsTypes.CODEREVIEW,
        url: collaboration.url,
        collaborator_id: '1',
        id: collaboration.id,
        status: CollaborationsStatus.PENDING,
        business_unit: BusinessUnits.ADIANTE,
      }),
    );

    await expect(
      inMemoryCollaborationsRepository.findByStatus({
        status: CollaborationsStatus.PENDING,
      }),
    ).resolves.toEqual([
      {
        type: collaboration.type,
        url: collaboration.url,
        collaborator_id: collaboration.collaborator_id,
        id: collaboration.id,
        status: collaboration.status,
        business_unit: collaboration.business_unit,
      },
    ]);
  });
});
