import { InMemoryCollaborationsRepository } from '@collaborations/test/in-memory/InMemoryCollaborationsRepository';
import { FindOne } from '@collaborations/use-cases';
import {
  BusinessUnits,
  CollaborationsStatus,
  CollaborationsTypes,
} from '@shared/constants';

describe('Find a collaboration by id', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let sut: FindOne;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    sut = new FindOne(inMemoryCollaborationsRepository);
  });

  it('should be able to find a collaboration by id', async () => {
    const collaboration = await inMemoryCollaborationsRepository.register({
      type: CollaborationsTypes.CODEREVIEW,
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      business_unit: BusinessUnits.ADIANTE,
      collaborator_id: '10f47e61-65c0-48a3-9554-23f022750a66',
      status: CollaborationsStatus.PENDING,
    });

    const collaborationFound = await sut.execute(collaboration.id);

    expect(collaborationFound).toEqual(
      expect.objectContaining({
        id: collaboration.id,
        type: collaboration.type,
        url: collaboration.url,
        business_unit: collaboration.business_unit,
        collaborator_id: collaboration.collaborator_id,
        status: collaboration.status,
      }),
    );
  });

  it('should not be able to find a nonexistent collaboration', async () => {
    await expect(async () => {
      await sut.execute('edee8ffa-7c91-46f0-9fa6-4229f9b76768');
    }).rejects.toThrow('Collaboration does not exist');
  });
});
