import { FindById } from './find-by-id';

describe('Find a collaboration by id', () => {
  let inMemoryCollaborationsRepository: InMemoryCollaborationsRepository;
  let sut: FindById;

  beforeEach(() => {
    inMemoryCollaborationsRepository = new InMemoryCollaborationsRepository();
    sut = new FindById(inMemoryCollaborationsRepository);
  });

  it('should be able to find a collaboration by id', async () => {
    const collaboration = await inMemoryCollaborationsRepository.register({
      type: 'Code Review',
      url: 'https://github.com/Grupo-GCB/academy-gamification/pull/14',
      collaborator_id: '1',
      status: 'pending',
    });

    const collaborationFinded = await sut.execute(
      collaboration.collaboration_id,
    );

    expect(collaborationFinded).toEqual(
      expect.objectContaining({
        collaboration_id: collaboration.collaboration_id,
        type: collaboration.type,
        url: collaboration.url,
        collaborator_id: collaboration.collaborator_id,
        status: collaboration.status,
      }),
    );
  });

  it('should not be able to find a nonexistent collaboration', async () => {
    await expect(async () => {
      await sut.execute('edee8ffa-7c91-46f0-9fa6-4229f9b76768');
    }).rejects.toThrow('Collaboration does not exist!');
  });
});
